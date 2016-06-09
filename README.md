# AtomPusher-Lambda
### The AWS Lambda component of the AtomPusher system

* Create the Lambda method
  - Go to the AWS Lambda console here: https://console.aws.amazon.com/lambda/home
  - Click 'Create a Lambda function'
  - Click on 'Skip' at the bottom of the panel
  - Give the function a unique name
  - Choose the 'Edit code inline' radio button
  - Paste in the code from index.js in this repository
  - In the code, in the 'opts' block, modify the 'host' parameter to point to your AtomPusher-Collector instance
  - Below the code, in the 'Role' dropdown, choose '* basic execution role'; on the next page, leave the defaults and choose 'Allow'
  - Set the timeout to 60 seconds
  - Choose 'Next'
  - Choose 'Create function'
* Add an AWS IoT rule to route messages from the Sensors to the Lambda method
  - Go to the AWS IoT console
  - Click 'Create a resource'
  - Click 'Create a rule'
  - Give the rule a unique name and a description
  - Choose '2016-03-23-beta' as the SQL version
  - In the 'Attribute' field, enter '*'
  - In the 'Topic filter' field, enter 'feeds'
  - In the 'Choose an action' dropdown, choose 'Insert this message into a code function and execute it (Lambda)'
  - In the 'Function name' dropdown, choose your Lambda function
  - Click 'Add action'
  - Click 'Create'
