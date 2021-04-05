tinymce.init({
  selector: 'textarea#message',
  branding: false,
  plugins: 'autolink autosave charmap emoticons link lists paste preview wordcount',
  toolbar: ['undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | preview'],
  setup: function (editor) {
    editor.on('change', function () {
      tinymce.triggerSave();
    });
  }
});

var callAPI = (subject,message)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", AUTH_API_KEY);
  var raw = JSON.stringify({"subject":subject,"body":message});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://api.zilio.eu/PROJECT/mail", requestOptions)
    .then(response => {
      console.log(response.status);
      response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}
