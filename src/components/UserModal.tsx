"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { User } from "@/types/user";
import styles from "@/styles/UserModal.module.css";

interface UserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

function UserModal({
  user,
  isOpen,
  onClose,
}: UserModalProps): React.ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState<string>("");

  const handleClose = useCallback((): void => {
    setAnimationClass("");
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimationClass(styles.modalOverlayVisible), 10);
    } else {
      setAnimationClass("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling of the body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleClose]);

  const getMapUrl = (lat: string, lng: string): string => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <div className={`${styles.modalOverlay} ${animationClass}`} data-testid="modal-overlay">
      <div className={styles.modalContent} ref={modalRef} data-testid="modal-content">
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className={styles.modalBody}>
          {/* Header with Name and Email */}
          <div className={styles.userHeader}>
            <h2 className={styles.userName}>{user.name}</h2>
            <a href={`mailto:${user.email}`} className={styles.userEmail}>{user.email}</a>
          </div>

          {/* Address Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <div className={styles.addressContent}>
              <p>{user.address.suite}, {user.address.street}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
              <p className={styles.mapLinkContainer}>
                <span className={styles.mapIcon}>📍</span>
                <a
                  href={getMapUrl(user.address.geo.lat, user.address.geo.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  View on map
                </a>
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contactContent}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone:</span>
                <span>{user.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Website:</span>
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.websiteLink}
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <div className={styles.companyContent}>
              <div className={styles.companyItem}>
                <span className={styles.companyLabel}>Name:</span>
                <span>{user.company.name}</span>
              </div>
              <div className={styles.companyItem}>
                <span className={styles.companyLabel}>Catchphrase:</span>
                <span>{user.company.catchPhrase}</span>
              </div>
              <div className={styles.companyItem}>
                <span className={styles.companyLabel}>Business:</span>
                <span>{user.company.bs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
