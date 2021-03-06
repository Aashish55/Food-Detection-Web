# Tensorflow Object Detection Web App
<p>This template app can be used for real time object detection by leveraging the Tensorflow Object Detection API, React and Tensorflow JS. 
<br/><br/><br/>
#Screenshot of the webapp
  <img src='/src/screenshots/screenshot1.png' />
<br/>
## Steps
<br />
<b>Step 1.</b> Clone this repository: https://github.com/Aashish55/Food-Detection-Web
<br/><br/>
<b>Step 2.</b> Install Node https://nodejs.org/en/
<br/><br/>
<b>Step 3.</b> Install App Depdendencies 
<pre>npm install</pre>
<br/><br/>
<b>Step 4.</b> Create a new free object storage repository on IBM Cloud <a href="https://cloud.ibm.com/objectstorage/create">Create Cloud Object Storage Bucket</a> 
<br/><br/>
<b>Step 5.</b> Create a new bucket and store model.json and .bin files into the bucket.</a> 

<br/><br/>
<b>Step 6.</b> Enable public access policy.</a> 

<br/><br/>
<b>Step 7.</b> Download and install the Cloud Object Store plugin.</a> 
<br/><br/>
<b>Step 8.</b> Login to the IBM Cloud CLI, target the right region and run the following command from inside of the TFODApp folder.</a> 
<pre>ibmcloud cos bucket-cors-put --bucket livelong --cors-configuration file://corsconfig.json</pre>
<br/><br/>
<b>Step 9.</b> Update the following line with the link to your model.json file inside of the cloud bucket.</a> 
<pre>
const net = await tf.loadGraphModel('YOUR MODEL.json file here')
// e.g. const net = await tf.loadGraphModel('https://tfodfooddetection.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
</pre>
This URI is available from your bucket. Select the model.json file then choose object details and the link will be made available. 

<br/><br/>
<b>Step 10.</b> Update the labelmap inside of utilities.js with your labels.</a> 
<br/><br/>
<b>Step 11.</b> Start the app by running npm start.</a> 
<pre>npm start</pre>
<br/><br/>
