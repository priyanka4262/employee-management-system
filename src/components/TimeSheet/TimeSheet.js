import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { toast } from "react-toastify";
const localizer = momentLocalizer(moment);

export default class TimeSheet extends Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment().add(0, "days").toDate(),
          title: "timesheets",
        },
      ],
    };
  }

  slotSelected = ({ start, end, resourceId }) => {
    console.log("slot selected", start, end);
    // toast("selected");
    this.props.history.push("/homepage/timesheetdesc");
  };

  render() {
    return (
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          onSelectSlot={this.slotSelected}
          selectable={true}
        />
      </div>
    );
  }
}
