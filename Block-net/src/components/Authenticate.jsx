import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSSCode/Authenticate.module.css"; // Assuming you're using CSS Modules

const Authenticate = () => {
  const [ownerAddress, setOwnerAddress] = useState("");
  const [addressInfo, setAddressInfo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOwnerAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedInfo = await fetchAddressInfo(ownerAddress);
      if (fetchedInfo) {
        setAddressInfo(fetchedInfo);
        setError("");
      } else {
        setError("No information found for this address.");
      }
    } catch (error) {
      console.error("Error fetching address information:", error);
      setError("Failed to fetch address information.");
    }
  };

  const fetchAddressInfo = async (address) => {
    const dummyData = {
      "0x1234567890abcdef": { domains: ["example.ejust", "test.ejust"] },
      "0xfedcba0987654321": { domains: ["blocknet.ejust"] },
    };
    return dummyData[address.toLowerCase()] || null;
  };

  const handleManageDomain = () => {
    navigate(`/manage-domain?owner=${ownerAddress}`);
  };

  return (
    <div className={styles.authenticateContainer}>
      <h1 className={styles.title}>Authenticate</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="ownerAddress" className={styles.label}>
          Owner Address:
        </label>
        <input
          type="text"
          id="ownerAddress"
          value={ownerAddress}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {addressInfo && (
        <div className={styles.addressInfo}>
          <h2>Address Information</h2>
          <p><strong>Domains:</strong> {addressInfo.domains.join(", ")}</p>
          <button onClick={handleManageDomain} className={styles.manageButton}>
            Manage Domain
          </button>
        </div>
      )}
    </div>
  );
};

export default Authenticate;
