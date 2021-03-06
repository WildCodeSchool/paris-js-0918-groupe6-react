import React, { Component } from "react";
import axios from "axios";
import { MakeCompletedUrl } from "../../tools";
import CompanyOffers from "./CompanyOffers";
import { FULL_RESTRICTED } from "../CompanyApplication/studentConstant";

const mode = "SELECT";
const modeRefuse = "REFUSE";

class CompanyOffersRoot extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    const idCompany = sessionStorage.getItem("token");
    axios.get(MakeCompletedUrl(`company/${idCompany}`)).then(res => {
      // console.log("data", res.data);
      this.setState({
        missions: res.data.Missions.sort((a, b) => a - b),
        company: res.data,
        isLoaded: true
      });
    });
    axios
      .get(MakeCompletedUrl(`application/${idCompany}/${mode}/mytrainee`))
      .then(res =>
        this.setState({
          trainee: res.data.data
        })
      );
  }

  handleCloseRefresh = (idTrainee, missionId) => {
    const trainee = [];
    this.state.trainee.map(e => {
      // console.log("e", e);
      if (e.mission_id === missionId) {
        // const newDataApplication = e.dataApplications.map(f => {
        //   if (f.TraineeId !== idTrainee) return f;
        // });
        const newDataApplication = [
          ...e.dataApplications.filter(
            element => element.TraineeId !== idTrainee
          )
        ];
        const result = {
          isFull: e.isFull,
          mission_id: e.mission_id,
          titleMission: e.titleMission,
          dataApplications: newDataApplication
        };
        trainee.push(result);
        // console.log(newDataApplication);
      } else {
        const result = {
          isFull: e.isFull,
          mission_id: e.mission_id,
          titleMission: e.titleMission,
          dataApplications: e.dataApplications
        };
        trainee.push(result);
      }
    });
    this.setState({
      trainee
    });
    // console.log(trainee);
  };

  render() {
    const { missions, isLoaded, trainee, company } = this.state;
    // console.log("trainee", trainee);
    return (
      <div>
        {!isLoaded ? (
          "loading"
        ) : (
          <CompanyOffers
            trainee={trainee}
            missions={missions}
            mode={mode}
            company={company}
            size={FULL_RESTRICTED}
            modeRefuse={modeRefuse}
            handleCloseRefresh={this.handleCloseRefresh}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export default CompanyOffersRoot;
