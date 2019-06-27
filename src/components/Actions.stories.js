
import { storiesOf } from "@storybook/react";
import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Table, Button, Icon } from "antd";
import { duration } from "moment";

const data = [
  {
    key: "1",
    Pipeline: "ZipTest",
    Started: "21.03.2019 12:26:23",
    Duration: "0:00:10",
    "Executed by": "admin"
  },
  {
    key: "2",
    Pipeline: "MultiTest",
    Started: "19.03.2019 14:58:25",
    Duration: "0:00:12",
    "Executed by": "admin"
  },
  {
    key: "3",
    Pipeline: "Test",
    Started: "19.03.2019 14:46:25",
    Duration: "0:00:11",
    "Executed by": "admin"
  }
];

class ActionForm extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: [],
    row_data: []
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearSort = () => {
    this.setState({

      sortedInfo: null
    });
  };

  setRefresh = async () => {
    this.setState({
      data: []
    });

    let pipelines = await this.getPipelines().then(r => r.json());

    //let data = [];
    for (let i = 0; i < pipelines.length; i++) {
      let current_id = pipelines[i].id;
      let current_name = pipelines[i].name;

      console.log(current_id);

      let current_data = await this.getWebData(current_id).then(r => r.json());

      let converted_data = this.convertData(current_data, current_name);

      console.log(this.state.data);

      this.setState({
        data: this.state.data.concat(converted_data)
      });

      //data = data.concat(current_data);
      //data.push({current_name: current_data});
      /*
      for (let j = 0; j < current_data.length; j++) {
        current_data[j].name = current_name;
        data.push(current_data[j]);
      }
      */
    }

    /*
    console.log(this.state.row_data);

    let converted_data = this.convertData(data);

    console.log(converted_data);

    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      data: converted_data,
    });
    */
  };

  convertData = (new_data, name) => {
    let data = [];

    for (let i = 0; i < new_data.length; i++) {
      var options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        //weekday: 'long',
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };

      const start = new Date(new_data[i].start);
      const end = new Date(new_data[i].end);
      const duration = new Date();
      duration.setHours(0, 0, 0, end - start);
      const executor = new_data[i].userExternalId;

      data.push({
        key: new_data[i].id,
        Pipeline: name,
        Started: start.toLocaleString("en-US", options),
        Duration: duration.toTimeString().split(" ")[0],
        "Executed by": executor
      });
    }
    return data;
  };

  getPipelines = () => {
    let shit = "https://cors-anywhere.herokuapp.com/";
    let url = "http://82.202.226.30:8080";
    let prefix = "/master/api/1/pipelines/?userExternalId=admin";

    var username = "master";
    var password = "commander";
    var headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json");
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Accept', 'application/json');

    let webData = fetch(shit + url.concat(prefix), {
      method: "GET",
      headers: headers
    });

    return webData;
  };

  getWebData = pipe_id => {
    let shit = "https://cors-anywhere.herokuapp.com/";
    let url = "http://82.202.226.30:8080";
    let prefix = "/master/api/1/pipelines/" + pipe_id + "/executions/";

    const stroka = "/master/api/1/pipelines/" + pipe_id + "/executions/";
    console.log(stroka);

    var username = "master";
    var password = "commander";
    var headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json");
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Accept', 'application/json');

    let webData = fetch(shit + url.concat(prefix), {
      method: "GET",
      headers: headers
    });

    return webData;
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    /*
    let data = this.getWebData().then((r) => r.json());
    data = this.convertData(data);
   this.setState({
      data: data,
    });
    
*/
    //this.setRefresh();
    const columns = [
      {
        title: "Action",
        dataIndex: "Action",
        key: "Action",
        render: () => (
          <div>
            <Button shape="circle" icon="search" />
            <Button shape="circle" icon="play-circle" />
            <Button shape="circle" icon="printer" />
          </div>
        )
      },
      {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
        render: () => (
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        )
      },
      {
        title: "Pipeline",
        dataIndex: "Pipeline",
        key: "Pipeline"
      },
      {
        title: "Started",
        type: "datetime-local",
        dataIndex: "Started",
        key: "Started",
        sorter: (a, b) => a.Started - b.Started,
        sortDirections: ["descend"]
      },
      {
        title: "Duration",
        type: "time",
        dataIndex: "Duration",
        key: "Duration"
      },
      {
        title: "Debug",
        dataIndex: "Debug",
        key: "Debug",
        render: () => <Icon type="eye-invisible" />
      },
      {
        title: "Sch.",
        dataIndex: "Sch.",
        key: "Sch.",
        render: () => <Icon type="disconnect" />
      },
      {
        title: "Executed by",
        dataIndex: "Executed by",
        key: "Executed by"
      }
    ];

    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.setRefresh} type="primary">
            Refresh
          </Button>
          <Button onClick={this.clearFilters} type="primary">
            Clear filters
          </Button>
          <Button onClick={this.clearSort} type="primary">
            Clear sort
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

storiesOf("Actions", module).add("Actions", () => <ActionForm />);

export default ActionForm;

