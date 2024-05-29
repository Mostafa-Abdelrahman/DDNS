import React, { useState } from "react";
import styles from "../CSSCode/ManageDomain.module.css"; 
import { deleteDomain, transferDomain, updateDomain } from '../services/domainService'; 

const initialDomains = [
  { name: "example.com", owner: "owner1", ip: "192.168.0.1" },
  { name: "test.com", owner: "owner2", ip: "192.168.0.2" },
  { name: "sample.com", owner: "owner3", ip: "192.168.0.3" },
];

const ManageDomain = () => {
  const [domains, setDomains] = useState(initialDomains);
  const [action, setAction] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAction = (selectedAction) => {
    setAction(selectedAction);
  };

  const handleSearch = () => {
    const domain = domains.find(d => d.name === searchQuery);
    setSelectedDomain(domain);
  };

  const handleDeleteDomain = async (domain) => {
    try {
      await deleteDomain(domain.name);
      setDomains(domains.filter(d => d.name !== domain.name));
      setSelectedDomain(null);
      setAction(null);
    } catch (error) {
      console.error("Error deleting domain:", error);
    }
  };

  const handleTransferDomain = async (domain, newOwner) => {
    try {
      await transferDomain(domain.name, newOwner);
      setDomains(domains.map(d => d.name === domain.name ? { ...d, owner: newOwner } : d));
      setSelectedDomain(null);
      setAction(null);
    } catch (error) {
      console.error("Error transferring domain:", error);
    }
  };

  const handleUpdateDomain = async (domain, newIp) => {
    try {
      await updateDomain(domain.name, newIp);
      setDomains(domains.map(d => d.name === domain.name ? { ...d, ip: newIp } : d));
      setSelectedDomain(null);
      setAction(null);
    } catch (error) {
      console.error("Error updating domain:", error);
    }
  };

  const renderForm = () => {
    if (!selectedDomain) return null;

    switch (action) {
      case "delete":
        return <DeleteDomain domain={selectedDomain} onDelete={handleDeleteDomain} />;
      case "transfer":
        return <TransferDomain domain={selectedDomain} onTransfer={handleTransferDomain} />;
      case "update":
        return <UpdateDomain domain={selectedDomain} onUpdate={handleUpdateDomain} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.manageDomainContainer}>
      <h2 className={styles.title}>Manage Domain</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a domain"
          className={styles.input}
        />
        <button
          onClick={handleSearch}
          className={`${styles.actionButton} ${styles.searchButton}`}
        >
          Search
        </button>
      </div>
      {selectedDomain && !action && (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => handleSelectAction('delete')}
            className={`${styles.actionButton} ${styles.deleteButton}`}
          >
            Delete
          </button>
          <button
            onClick={() => handleSelectAction('transfer')}
            className={`${styles.actionButton} ${styles.transferButton}`}
          >
            Transfer
          </button>
          <button
            onClick={() => handleSelectAction('update')}
            className={`${styles.actionButton} ${styles.updateButton}`}
          >
            Update
          </button>
        </div>
      )}
      <div className={styles.formContainer}>
        {renderForm()}
      </div>
    </div>
  );
};

const DeleteDomain = ({ domain, onDelete }) => {
  return (
    <div className={styles.manageActionContainer}>
      <h2 className={styles.title}>Delete Domain</h2>
      <p>Are you sure you want to delete {domain.name}?</p>
      <button
        onClick={() => onDelete(domain)}
        className={`${styles.actionButton} ${styles.deleteButton}`}
      >
        Delete Domain
      </button>
    </div>
  );
};

const TransferDomain = ({ domain, onTransfer }) => {
  const [newOwner, setNewOwner] = useState("");

  return (
    <div className={styles.manageActionContainer}>
      <h2 className={styles.title}>Transfer Domain</h2>
      <p>Transferring {domain.name} to a new owner.</p>
      <input
        type="text"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        placeholder="Enter new owner address"
        className={styles.input}
      />
      <button
        onClick={() => onTransfer(domain, newOwner)}
        className={`${styles.actionButton} ${styles.transferButton}`}
      >
        Transfer Domain
      </button>
    </div>
  );
};

const UpdateDomain = ({ domain, onUpdate }) => {
  const [newIp, setNewIp] = useState("");

  return (
    <div className={styles.manageActionContainer}>
      <h2 className={styles.title}>Update Domain</h2>
      <p>Updating {domain.name} with a new IP address.</p>
      <input
        type="text"
        value={newIp}
        onChange={(e) => setNewIp(e.target.value)}
        placeholder="Enter new IP address"
        className={styles.input}
      />
      <button
        onClick={() => onUpdate(domain, newIp)}
        className={`${styles.actionButton} ${styles.updateButton}`}
      >
        Update Domain
      </button>
    </div>
  );
};

export default ManageDomain;
