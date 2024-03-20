import { useState, useMemo } from "react";
import { fetchingPlaces } from "./http.js";
import "./app2.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function App2() {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "300px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [userPlaces, setUserPlaces] = useState([]);
  const [colDef] = useState([
    { field: "id" },
    { field: "title" },
    { field: "lat" },
    { field: "lon" },
  ]);

  async function fetchPlaces() {
    try {
      const places = await fetchingPlaces();
      console.log(places);
      setUserPlaces(places);
    } catch (error) {
      setError({ message: error.message || "failed" });
    }
  }

  const paginationPageSizeSelector = useMemo(() => {
    return [2, 5, 10];
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}></div>
      <AgGridReact
        rowData={userPlaces}
        columnDefs={colDef}
        pagination
        paginationPageSize={5}
        paginationPageSizeSelector={paginationPageSizeSelector}
        onGridReady={fetchPlaces}
      />
    </div>
  );
}

export default App2;
