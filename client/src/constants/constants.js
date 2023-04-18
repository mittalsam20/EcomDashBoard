export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const googleGeoCodingApiKey = process.env.GOOGLE_GEO_CODING_API_KEY;

export const getDataGridCustomStyles = ({ theme }) => ({
  "& .MuiDataGrid-root": { border: "none" },
  "& .MuiDataGrid-cell": { borderBottom: "none" },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.secondary[100],
    borderBottom: "none",
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.secondary[100],
    borderTop: "none",
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: `${theme.palette.secondary[200]} !important`,
  },
});
