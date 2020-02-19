import React from 'react';
import { closeModal } from "../../../actions/modal_actions";
import { connect } from "react-redux";
import ProductContainer from "./product_container";
import SessionFormContainer from "../nav/session_form_container";
import UserFormContainer from "../nav/user_form_container";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'product':
      component = <ProductContainer fromModal={true} />
      break;
    case 'login':
      component = <SessionFormContainer />
      break;
    case 'signup':
      component = <UserFormContainer />
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <span className="x">X</span>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  modal: state.ui.modal[0]
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)