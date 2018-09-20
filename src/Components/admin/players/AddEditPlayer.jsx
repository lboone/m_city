import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../ui/FormField";
import { validate } from "../../../utils/validation";
import Fileuploader from "../../ui/Fileuploader";

import {
  firebasePlayers,
  getPlayerById,
  getPlayerImageURL,
  firebaseDB
} from "../../../firebase";

class AddEditPlayer extends Component {
  state = {
    isLoading: true,
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player Name",
          name: "name_input",
          type: "text",
          placeholder: "Enter the player name"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player Last Name",
          name: "lastname_input",
          type: "text",
          placeholder: "Enter the player last name"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player Number",
          name: "number_input",
          type: "text",
          placeholder: "Enter the player number"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select A Position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          require: true
        },
        valid: true
      }
    }
  };
  updateForm(element, content = "") {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }
  updateFields(player, playerId, type, defaultImg) {
    const newFormData = {
      ...this.state.formData
    };

    for (let key in newFormData) {
      if (player) {
        newFormData[key].value = player[key];
        newFormData[key].valid = true;
      }
    }
    this.setState({
      playerId,
      formType: type,
      defaultImg,
      formData: newFormData,
      isLoading: false
    });
  }
  successForm(message) {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  }
  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === "Edit Player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(error => {
            this.setState({
              formError: true
            });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }
  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        formType: "Add Player"
      });
    } else {
      getPlayerById(playerId).then(snapshot => {
        this.setState({
          isLoading: true
        });
        const player = snapshot.val();

        getPlayerImageURL(player.image)
          .then(url => {
            this.updateFields(player, playerId, "Edit Player", url);
          })
          .catch(() => {
            this.setState({
              defaultImg: "",
              isLoading: false
            });
            this.updateFields(player, playerId, "Edit Player", null);
          });
      });
    }
    this.setState({
      isLoading: false
    });
  }
  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;
    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };
  storeFilename = filename => {
    this.updateForm(
      {
        id: "image"
      },
      filename
    );
  };
  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          {this.state.isLoading ? (
            <div className="admin_progress">
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            </div>
          ) : (
            <div>
              <h2>{this.state.formType}</h2>
              <div>
                <form onSubmit={event => this.submitForm(event)}>
                  <Fileuploader
                    dir="players"
                    tag={"Player Image"}
                    defaultImg={this.state.defaultImg}
                    defaultImgName={this.state.formData.image.value}
                    resetImage={() => this.resetImage()}
                    filename={filename => this.storeFilename(filename)}
                  />
                  <FormField
                    id={"name"}
                    formData={this.state.formData.name}
                    change={element => this.updateForm(element)}
                  />
                  <FormField
                    id={"lastname"}
                    formData={this.state.formData.lastname}
                    change={element => this.updateForm(element)}
                  />
                  <FormField
                    id={"number"}
                    formData={this.state.formData.number}
                    change={element => this.updateForm(element)}
                  />

                  <FormField
                    id={"position"}
                    formData={this.state.formData.position}
                    change={element => this.updateForm(element)}
                  />
                  <div className="success_label">{this.state.formSuccess}</div>
                  {this.state.formError ? (
                    <div className="error_label">Something is wrong</div>
                  ) : (
                    ""
                  )}
                  <div className="admin_sumbit">
                    <button onClick={event => this.submitForm(event)}>
                      {this.state.formType}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
