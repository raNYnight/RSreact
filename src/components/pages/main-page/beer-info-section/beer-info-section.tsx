import React from 'react';
import { Outlet } from 'react-router-dom';

function BeerInfoSection() {
  return (
    <div className="beer-info">
      <Outlet />
    </div>
  );
}
export default BeerInfoSection;
