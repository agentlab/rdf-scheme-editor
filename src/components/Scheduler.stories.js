import { storiesOf } from "@storybook/react";
import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Table, Button, Icon } from "antd";


class ScheduleForm extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data: []
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

    addNewRule = async () => {
        let pipelines = await this.getPipelines().then(r => r.json());

        this.setState({
            data: []
        });
        for (let i = 0; i < pipelines.length; i++) {
            let current_id = pipelines[i].id;
            let current_name = pipelines[i].name;

            console.log(current_id);

            let current_data = await this.getWebData(current_id).then(r => r.json());

            console.log(current_data);

            let converted_data = this.convertData(current_data, current_name);

            console.log(this.state.data);

            this.setState({
                data: this.state.data.concat(converted_data)
            });
        }
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

            const last = new Date(new_data[i].lastExecution);
            const next = new Date(new_data[i].nextExecution);
            const period = null;
            try {
                period = new_data[i].periodUnit.toLowerCase();
            } catch (err) {
                period = null;
            }

            const duration = new Date();
            duration.setHours(0, 0, 0, last - next);
            const scheduler = new_data[i].userExternalId;

            const rule = null;
            const some_date = last.toLocaleTimeString("en-US", options);
            if (period) {
                rule = "Run on " + some_date + " and then repeat every " + period;
            } else rule = "Run on " + some_date;

            data.push({
                key: new_data[i].id,
                Pipeline: name,
                Rule: rule,
                Last: some_date,
                Next: next.toLocaleTimeString("en-US", options),
                Duration: duration.toTimeString().split(" ")[0],
                "Scheduled by": scheduler
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
        let prefix = "/master/api/1/pipelines/" + pipe_id + "/schedules/";

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
                title: "Rule",
                dataIndex: "Rule",
                key: "Rule"
            },
            {
                title: "Last",
                type: "datetime-local",
                dataIndex: "Last",
                key: "Last",
                sorter: (a, b) => a.Started - b.Started,
                sortDirections: ["descend"]
            },
            {
                title: "Next",
                type: "datetime-local",
                dataIndex: "Next",
                key: "Next",
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
                title: "Schedule",
                dataIndex: "Schedule",
                key: "Schedule"
            }
        ];
        return (
            <div>
                <div className="table-operations">
                    <Button onClick={this.addNewRule} type="primary">
                        Add new scheduling rule
          </Button>
                    <Button onClick={this.clearFilters} type="primary">
                        Clear filters
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

storiesOf("UnifiedViews", module).add("Scheduler", () => <ScheduleForm />);

export default ScheduleForm;


