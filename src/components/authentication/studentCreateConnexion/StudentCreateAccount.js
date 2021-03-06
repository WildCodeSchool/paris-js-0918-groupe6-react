import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { MakeCompletedUrl } from "../../../tools";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { selectStudent } from "../../../actions/getIdAction";
import "../authentication.css";

class StudentCreateAccount extends Component {
  state = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    title: "",
    content: "",
    button: "",
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    const { firstname, lastname, email, password } = this.state;
    const { props } = this;

    e.preventDefault();
    const postFormStudent = {
      firstname,
      lastname,
      email,
      password
    };
    axios
      .post(MakeCompletedUrl("trainee"), postFormStudent)
      .then(result => {
        props.selectStudent(result.data.id);
        sessionStorage.setItem("token", result.data.id);
        props.history.push("/trainee");
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({
            open: true,
            title: `Utilisateur déjà enregistré`,
            content: `Cette adresse mail existe déjà, connectez-vous`,
            button: `Fermer`
          });
        } else {
          this.setState({
            open: true,
            title: `Oups une erreur s'est produite`,
            content: `Veuillez recommencer s'il-vous-plait`,
            button: `Fermer`
          });
        }
      });
  };

  render() {
    const { open, title, content, button } = this.state;
    return (
      <div className="createForm">
        <form method="post" onSubmit={this.onSubmit}>
          <TextField
            type="text"
            className="textField"
            name="firstname"
            label="Prénom"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            className="textField"
            name="lastname"
            label="Nom"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            type="email"
            className="textField"
            name="email"
            label="Email"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            type="password"
            className="textField"
            name="password"
            label="Mot de passe"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            variant="contained"
            className="buttonCreateForm classic_button_orange"
            type="submit"
          >
            {`S'inscrire`}
          </Button>
        </form>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              //className="police_button_black"
              onClick={this.handleClose}
              color="primary"
            >
              {button}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectStudent
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(StudentCreateAccount);
