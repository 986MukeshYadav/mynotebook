import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description} </p>
          <i class="fa fa-trash-alt mx-2"></i>
          <i class="far fa-edit mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
