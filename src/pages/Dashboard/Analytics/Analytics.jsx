import { useEffect, useState } from "react";
import "./Analytics.css";
import { getLinkAnalytics } from "../../../services/link";

import sortUp from "../../../assets/up.png";
import sortDown from "../../../assets/down.png";

function Analytics() {

  const [analytics, setAnalytics] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "timestamp",
    order: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);


  const fetchAnalytics = async (page, sortConfig) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await getLinkAnalytics(sortConfig, page, token);
      const data = await res.json();

      if (res.status === 200) {
        setAnalytics(data.analytics);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchAnalytics(currentPage, sortConfig);
  }, [sortConfig]);

  useEffect(() => {
    fetchAnalytics(currentPage, sortConfig);
  }, [currentPage]);

  const toggleSort = (field) => {
    setSortConfig((prev) => ({
      sortBy: field,
      order: prev.sortBy === field && prev.order === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  return (
    <div className="analyticsPage-tableContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="analytics-InnerTableContainer">
          <div className="analytics-table-wrapper">
            <table className="analyticsPage-table">
              <thead className="analyticsPage-table-headings">
                <tr>
                  <th className="analyticsTable-border analyticsTable-date-column analyticsTable-date-column-heading">
                    <div className="date-heading">
                      <p>Timestamp</p>
                    </div>
                    <div className="analyticsTable-timeSortButtons-container">
                       <div className={` timestampSortButtons ${
                                                  sortConfig.sortBy === "timestamp" &&
                                                  (sortConfig.order === "asc" ? "timestampSortActive" : "")
                                                }`}>
                                              <img
                                                src={sortUp}
                                                alt=""
                                                onClick={() => toggleSort("timestamp")}
                                              />
                                            </div>
                                            <div className="dateSortButtons">
                                              <img
                                                src={sortDown}
                                                alt=""
                                                className={`${
                                                  sortConfig.sortBy === "createdAt" &&
                                                  (sortConfig.order === "desc"
                                                    ? "timestampSortActive"
                                                    : "")
                                                }`}
                                                onClick={() => toggleSort("timestamp")}
                                              />
                                            </div>
                    </div>
                  </th>
                  <th className="analyticsTable-border analyticsTable-original-url-column analyticsTable-url-column">Original URL</th>
                  <th className="analyticsTable-border analyticsTable-short-url-column analyticsTable-url-column">Short URL</th>
                  <th className="analyticsTable-border analyticsTable-ip-column">IP Address</th>
                  <th className="analyticsTable-border analyticsTable-browser-column">User Device</th>
                </tr>
              </thead>
              <tbody className="analyticsPage-table-body">
                {analytics.map((entry, index) => (
                  <tr key={index}>
                    <td className="analyticsTable-border analyticsTable-date-column">{entry.timestamp}</td>
                    <td className="analyticsTable-border analyticsTable-original-url-column analyticsTable-url-column"><span data-full-url={entry.originalURL}>{entry.originalURL}</span> </td>
                    <td className="analyticsTable-border analyticsTable-url-column analyticsTable-short-url-column">
                                              <span data-full-url={entry.shortURL} >
                                                <a
                                                  className="analyticsTable-short-url-column-aTag"
                                                  href={entry.shortURL}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  onClick={() => fetchAnalytics(currentPage, sortConfig)}
                                                >
                                                  {entry.shortURL}
                                                </a>
                                              </span>
                                        </td>
                    <td className="analyticsTable-border analyticsTable-ip-column">{entry.ip}</td>
                    <td className="analyticsTable-border analyticsTable-browser-column">{entry.userDevice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination">

        <div
      className={`prev-btn ${currentPage === 1 ? "disabled" : ""}`}
      onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
    >
      {"<"}
    </div>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <div
      className={`next-btn ${currentPage === totalPages ? "disabled" : ""}`}
      onClick={() => currentPage < totalPages && setCurrentPage((prev) => prev + 1)}
    >
      {">"}
    </div>
          
        </div>
      )}
    </div>
  );
}
export default Analytics
