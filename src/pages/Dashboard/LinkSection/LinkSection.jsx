import { useEffect, useRef, useState } from "react";
import "./LinkSection.css";
import { getLinks } from "../../../services/link";

import editIcon from "../../../assets/edit.png";
import deleteIcon from "../../../assets/delete.png";
import copyIcon from "../../../assets/copy.png";
import sortUp from "../../../assets/up.png";
import sortDown from "../../../assets/down.png";
import PropTypes from "prop-types";

function LinkSection({
  setShowModal,
  setEditModal,
  setDeleteModal,
  setShortURLID,
  lastUpdated,
  searchQuery,
  showToast
}) {
  const [links, setLinks] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const isFirstRender = useRef(true);

  const fetchLinks = async (page, sortConfig) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await getLinks(sortConfig, searchQuery ,page, token);
      const data = await res.json();

      if (res.status === 200) {
        setLinks(data.links);
        setTotalPages(data.totalPages);
        showToast(data.message);
      } else {
        setLinks([]);
        showToast(data.message);
      }
    } catch (err) {
      console.log(err);
      showToast('Server took a nap !!')
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
      return
    } 
    fetchLinks(currentPage, sortConfig);
  }, [sortConfig, lastUpdated, searchQuery, currentPage])


  const toggleSort = (field) => {
    setSortConfig((prev) => ({
      sortBy: field,
      order: prev.sortBy === field && prev.order === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const handleEdit = (e,id) => {
    e.preventDefault();
    setShowModal(true);
    setEditModal(true);
    setShortURLID(id);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setShortURLID(id);
    setDeleteModal(true);
    setShowModal(true);
  };

  const copyLinkToClipboard = async (shortURL) => {
    try {
      await navigator.clipboard.writeText(shortURL);
      showToast('Link copied')
    } catch (err) {
      console.log(err);
      showToast('Fiasco');
    }
  };

  return (
    <div className="linksPage-tableContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="InnerTableContainer">
          <div className="table-wrapper">
            <table className="linksPage-table">
              <thead className="linksPage-table-headings">
                <tr>
                  <th className="border date-column date-column-heading">
                    <div className="date-heading">
                      <p>Date</p>
                    </div>
                    <div className="dateSortButtons-container">
                      <div className="dateSortButtons">
                        <img
                          src={sortUp}
                          alt=""
                          className={`${
                            sortConfig.sortBy === "createdAt" &&
                            (sortConfig.order === "asc" ? "dateSortActive" : "")
                          }`}
                          onClick={() => toggleSort("createdAt")}
                        />
                      </div>
                      <div className="dateSortButtons">
                        <img
                          src={sortDown}
                          alt=""
                          className={`${
                            sortConfig.sortBy === "createdAt" &&
                            (sortConfig.order === "desc"
                              ? "dateSortActive"
                              : "")
                          }`}
                          onClick={() => toggleSort("createdAt")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className="border url-column">Original URL</th>
                  <th className="border url-column">Short URL</th>
                  <th className="border remarks-column">Remarks</th>
                  <th className="border narrow-column">Clicks</th>
                  <th className="border narrow-column status-row-heading"><div className="status-heading">
                      <p>Status</p>
                    </div>
                    <div className="statusSortButtons-container">
                      <div className="statusSortButtons">
                        <img
                          src={sortUp}
                          alt=""
                          className={`${
                            sortConfig.sortBy === "status" &&
                            (sortConfig.order === "asc" ? "statusSortActive" : "")
                          }`}
                          onClick={() => toggleSort("status")}
                        />
                      </div>
                      <div className="statusSortButtons">
                        <img
                          src={sortDown}
                          alt=""
                          className={`${
                            sortConfig.sortBy === "status" &&
                            (sortConfig.order === "desc"
                              ? "statusSortActive"
                              : "")
                          }`}
                          onClick={() => toggleSort("status")}
                        />
                      </div>
                    </div></th>
                  <th className="border narrow-column">Actions</th>
                </tr>
              </thead>
              <tbody className="linksPage-table-body">
                {links.map((link, index) => (
                  <tr key={index}>
                    <td className="border date-column">{link.createdAt}</td>
                    <td className="border url-column">
                      
                          <span data-full-url={link.originalURL}>{link.originalURL}</span>
                        
                    </td>
                    <td className="border url-column short-url">
                          <span data-full-url={link.shortURL} >
                            <a
                              className="links-url-column-aTag"
                              href={link.shortURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => fetchLinks(currentPage, sortConfig)}
                            >
                              {link.shortURL}
                            </a>
                          </span>

                      <img
                        className="shortURL-copy-button"
                        onClick={() => copyLinkToClipboard(link.shortURL)}
                        src={copyIcon}
                        alt="copy"
                      />
                    </td>
                    <td className="border remarks-column">{link.remarks}</td>
                    <td className="border narrow-column">{link.clicks}</td>
                    <td
                      className={`border narrow-column ${
                        link.status === "Active" ? "green" : "red"
                      }`}
                    >
                      {link.status}
                    </td>
                    <td className="border linksPage-actions-cell narrow-column">
                      <button
                        onClick={(e) => handleEdit(e, link.id)}
                        className="linksPage-edit-btn"
                      >
                        <img src={editIcon} alt="Edit" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, link.id)}
                        className="linksPage-delete-btn"
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LinkSection;

LinkSection.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  editModal: PropTypes.bool,
  setEditModal: PropTypes.func,
  deleteModal: PropTypes.bool,
  setDeleteModal: PropTypes.func,
  setShortURLID: PropTypes.func,
  lastUpdated :PropTypes.number,
  setSearchQuery: PropTypes.func,
  searchQuery: PropTypes.string,
  showToast: PropTypes.func
};
