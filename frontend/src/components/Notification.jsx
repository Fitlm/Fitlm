import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NotificationModal({ show, handleClose, data }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        {data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <li key={item._id}>
                &quot;{item.quote}&quot; - {item.author}
              </li>
            ))}
          </ul>
        ) : (
          <p>데이터 작업중</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

NotificationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NotificationModal;
