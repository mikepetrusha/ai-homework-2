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
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{user.name}</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.userInfoSection}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Username</div>
                <div className={styles.infoValue}>{user.username}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>{user.email}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoValue}>{user.phone}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Website</div>
                <div className={styles.infoValue}>{user.website}</div>
              </div>
            </div>
          </div>

          <div className={styles.userInfoSection}>
            <h3 className={styles.sectionTitle}>Address</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Street</div>
                <div className={styles.infoValue}>{user.address.street}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Suite</div>
                <div className={styles.infoValue}>{user.address.suite}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>City</div>
                <div className={styles.infoValue}>{user.address.city}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Zipcode</div>
                <div className={styles.infoValue}>{user.address.zipcode}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>
                  <div>
                    Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                  </div>
                  <a
                    href={getMapUrl(user.address.geo.lat, user.address.geo.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    View on map
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.userInfoSection}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Name</div>
                <div className={styles.infoValue}>{user.company.name}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Catch Phrase</div>
                <div className={styles.infoValue}>
                  {user.company.catchPhrase}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Business</div>
                <div className={styles.infoValue}>{user.company.bs}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
