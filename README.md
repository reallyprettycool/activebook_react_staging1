# DEMOED React App

***
## Table of contents
  - [Introduction](#introduction)
  - [Custom Activities](#how-to-create-custom-activities)
  - [Preview Component](#preview-component)
  - [Toggle Switch Component](#toggle-switch-component)
***
## Introduction
Introduction to the DEMOED React App

This is a web application that allows teachers to create and manage courses and activities. 
The application is built using React and Ant Design for the front-end, and Node.js and Express for the back-end while using MongoDB as the database.

The application is divided into two main sections:
- The course section
- The activity section

### The course section
The course section allows teachers to create and manage courses. Teachers can create new courses, view all courses, view a single course, edit a course, and delete a course.

### The activity section
The activity section allows teachers to create and manage activities. 
Teachers can create new activities, view all activities, view a single activity, edit an activity, and delete an activity.
They are able to assign activities to students and view the results of the activities.

Although the application comes with a few pre-built activities, teachers can create custom activities to suit their needs.

Teachers are able to create:
- Text and Images activities
- Multiple Choice activities
- Drag and Drop activities
- Interactive Video activities

[How to create custom activities](#how-to-create-custom-activities)



***
## How to create custom activities

### Step 1:
- Create a new folder in the `src/components/course/createContent` directory with the name of the activity you want to create. For example, if you want to create a new activity called `MyActivity`, create a new folder called `MyActivity` in the directory.

### Step 2:
- Every activity needs to have a title, description, and courseId when being saved.
- The activity object looks like this:
```
  {
    title: 'MyActivity',
    description: 'This is a description of my activity',
    
    activityParams: {
      'param1': 'value1'
    },
    
    activityType: 'MyActivity',
    activityId: Auto generated when saved,
    courseId: The course id of the course the activity is being saved to,    
}
```

### Step 3:
 - Add your activity to the create content page by adding it to the `tabList` array in the `CreateContent` component. For example:
 ```
   tabList = [
    { name: "Created Activities", value: "createdActivities" },
    { name: "Text And Images", value: "textImages" },
    { name: "Multiple Choice", value: "multipleChoice" },
    { name: "Drag and Drop", value: "dragAndDrop" },
    { name: "H5P", value: "h5p" },
    { name: "MyActivity", value: "myActivity" },
    { name: "Other Activities", value: "otherActivities" },
  ]
 ```
- Also add your activity to the renderForms function with any props you want to pass to it. For example:
```
renderForms = () => {
  switch (this.state.whatToShow) {
    case "multipleChoice":
      return <MultipleChoice />;
    case "textImages":
      return <TextImages onValueEmitted={this.showItem} />;
    case "h5p":
      return <H5P />;
    case "otherActivities":
      return <OtherActivities />;
    case "dragAndDrop":
      return <DragAndDropCreation
                onSave={this.saveActivity}
                editActivity={this.state.editThisActivity}
             />;
    case "myActivity":
        return <MyActivity />;
        
  default:
  return <CreatedActivities
            getActivityInfo={this.getActivityInfo}
            getActivity={this.getActivity}
            showItem={this.showItem}
            setEdit={this.editThisActivity}
            {...this.props}/> // So that we can redirect to the activity page with edit
  }
  };
```

- Already implemented, there is an editActivity function as well as saveActivity function that you can use to save and edit your activity. You can also pass props to your activity by adding them to the renderForms function. For example:
```
  saveActivity = async (activity, then) => {
    let newActivity
    // If the ID exists, then we are updating the activity
    if (activity._id) {
      newActivity = {
        ...activity,
        courseId: this.props.theCourse._id,
      }
      return this.service.put("/" + activity._id, newActivity)
          .then((response) => then(response))
    } else {
      // If the ID does not exist, then we are creating a new activity
        newActivity = {
            ...activity,
            courseId: this.props.theCourse._id,
            activityType: this.state.whatToShow,
        }
        return this.service.post("/create", newActivity)
            .then((response) => then(response))
    }
  }

  editThisActivity = (activity) => {
    this.setState({ whatToShow: activity.activityType, editThisActivity: activity });
  };
---------------------------------------
  case "myActivity":
        return <MyActivity 
                  onSave={this.saveActivity}
                  editThisActivity={this.editThisActivity}/>;

```
- For the edit activity feature, you will need to add a check within the constructor of your activity to see if the activity is being edited. For example:
```
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      activityParams: {},
    };
    
    if(this.props.editThisActivity) {
      const { title, description, activityParams } = this.props.editThisActivity;
      this.state = {
        title: title,
        description: description,
        activityParams: activityParams,
      };
    }
    
  }
```
***
## Preview Component
The preview component is a reusable component that can be used to preview any activity.
It is essentially a wrapper component that will display whatever is passed as a child component, within a modal.

### How to use the preview component
- Import the preview component into your activity component
- Create a state variable to keep track of whether the modal is open or not
- Create a function to open the modal
- Create a function to close the modal (toggling the state variable)
- Pass the close function to the preview component
- This is an example using the preview component in the `MyActivity` component:
```
import React, { Component } from 'react';
import { Button } from 'antd';
import PopUpModal from "../../../utils/previewActivty/PopUpModal";

class MyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewModal: false,
    };
  }

  closePreviewModal = () => {
    this.setState({ previewModal: false });
  };

  render() {
    return (
      <div>
        <Button onClick={()=> this.setState({ previewModal: true })}>Preview</Button>
        {
            this.state.previewModal &&
                <PopUpModal onClose={this.displayPreview}>
                    <myActivityComponent
                        {...this.props}/>
                </PopUpModal>
        }
    );
  }
}
```
***
## Toggle Switch Component
The toggle switch component is a reusable component that can be used to create a toggle switch.
The component was created due to lack of a built-in toggle switch with the Bootstrap version.

### How to use the toggle switch component
- Import the toggle switch component into your activity component
- Create a state variable to keep track of the toggle switch value
- Create a function to handle the toggle switch value change
- Pass the value and the function to the toggle switch component
- This is an example using the toggle switch component in the `MyActivity` component:
```
import React, { Component } from 'react';
import ToggleSwitch from "../../../utils/toggleSwitch/ToggleSwitch";

class MyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSwitchValue: false,
      toggleSwitchValue2: false,
    };
  }

  handleToggleSwitchChange = (value) => {
    this.setState({ toggleSwitchValue: value });
  };

  render() {
    return (
      <div>
        <ToggleSwitch
            value={this.state.toggleSwitchValue}
            onChange={this.handleToggleSwitchChange}
        />
        
        <ToggleSwitch
            value={this.state.toggleSwitchValue2}
            onChange={(value) => this.setState({ toggleSwitchValue2: value })}
        />
      </div>
    );
  }
}
```
***

