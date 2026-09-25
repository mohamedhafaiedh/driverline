"use client";

import React, { useState, useEffect } from "react";

export default function MentionsLegalesPopup() {
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const handleTrigger = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#mentions-popup"]');
      if (target) {
        e.preventDefault();
        setPopupOpen(true);
      }
    };
    document.addEventListener("click", handleTrigger);
    return () => document.removeEventListener("click", handleTrigger);
  }, []);

  if (!popupOpen) return null;

  return (
    <div
      className="elementor elementor-1495 elementor-location-popup dialog-show"
      style={{
        display: "block",
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.7)",
        overflowY: "auto",
        padding: "20px",
      }}
      onClick={() => setPopupOpen(false)}
    >
      <div
        className="dialog-widget-content"
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => setPopupOpen(false)}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#111",
          }}
        >
          &times;
        </button>
        <div className="popup-body-content">
          <div
            className="elementor elementor-1495 elementor-location-popup"
            data-elementor-id="1495"
            data-elementor-post-type="elementor_library"
            data-elementor-type="popup"
          >
            <div className="elementor-element elementor-element-2eeb15b8 e-flex e-con-boxed e-con e-parent">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-0eb8598 e-flex e-con-boxed e-con e-child">
                  <div className="e-con-inner">
                    <div className="elementor-element elementor-element-f05dba5 elementor-widget elementor-widget-heading">
                      <div className="elementor-widget-container">
                        <h1 className="elementor-heading-title elementor-size-default">
                          Mentions légales
                        </h1>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-6120168 elementor-widget elementor-widget-text-editor">
                      <div className="elementor-widget-container">
                        <h2>Éditeur de site</h2>
                        <p>
                          <b>Société : </b>Driver Line
                          <br />
                          <b>Téléphone : </b>+33 6 86 60 35 84
                          <br />
                          <b>Sites Web : </b>https://driverline.fr
                        </p>
                        <p>&nbsp;</p>
                        <h2>Hébergement</h2>
                        <p className="elementor-icon-box-description">
                          <b>Hébergeur : </b>Siteground (Paris Data Center)
                          <br />
                          <b>Site Web : </b>fr.siteground.com
                        </p>
                        <p>&nbsp;</p>
                        <h2>Politique de confidentialité</h2>
                        <p>
                          La présente politique de confidentialité vous informe
                          de la manière dont nous recueillons et traitons vos
                          données personnelles conformément au RGPD.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
