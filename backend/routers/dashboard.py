from calendar import month_abbr
from fastapi import APIRouter, Depends
from sqlmodel import Session, func, select
from backend.core.db import get_session
from backend.auth.deps import require_active_user
from backend.models.asset import Asset
from backend.models.location import Location

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/")
def get_dashboard(session: Session = Depends(get_session), current_user=Depends(require_active_user)):
    assets = session.exec(select(Asset)).all()

    total_assets_value = sum(a.value for a in assets)
    by_type = {
        "financial": sum(a.value for a in assets if a.type == "financial"),
        "tangible": sum(a.value for a in assets if a.type == "tangible"),
        "intangible": sum(a.value for a in assets if a.type == "intangible"),
    }
    by_status = {}
    for asset in assets:
        by_status[asset.status] = by_status.get(asset.status, 0) + 1

    # monthly rollups (by created_at month)
    monthly = {}
    for asset in assets:
        month_key = asset.created_at.month if asset.created_at else 1
        bucket = monthly.setdefault(month_key, {"financial": 0, "tangible": 0, "intangible": 0})
        bucket[asset.type] = bucket.get(asset.type, 0) + asset.value
    monthly_values = [
        {"month": month_abbr[m], **monthly[m]}
        for m in sorted(monthly.keys())
    ]

    # location rollup
    location_counts = (
        session.exec(
            select(Location.name, func.count(Asset.id))
            .join(Asset, isouter=True)
            .group_by(Location.name)
        ).all()
    )

    recent_assets = sorted(assets, key=lambda a: a.created_at, reverse=True)[:5]

    return {
        "summary": {
            "total_assets_value": total_assets_value,
            "by_type": by_type,
            "by_status": by_status,
            "asset_count": len(assets),
        },
        "monthly": monthly_values,
        "locations": [{"location": name, "count": count} for name, count in location_counts],
        "recent_assets": [
            {
                "id": a.id,
                "name": a.name,
                "category": a.category,
                "type": a.type,
                "value": a.value,
                "status": a.status,
            }
            for a in recent_assets
        ],
    }

