"use client"
import React from 'react'

function TopDeals({topDeal}:{topDeal:string}) {
  return (
    <div>
       <input
            type="checkbox"
            id="topDealCheckbox"
            checked={topDeal === 'true'}
            onChange={(e) => {
              e.target.checked ? 'true' : 'all';

            }}
          />
          <label htmlFor="topDealCheckbox">Top Deal</label>
    </div>
  )
}

export default TopDeals
