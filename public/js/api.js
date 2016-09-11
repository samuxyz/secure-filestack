filepicker.setKey("Anj637BlDTyMhOXjonqruz");
var upload = function(policy, signature){
	var progressBar = document.getElementById('progress-bar');
	filepicker.pick(
		{
	    mimetype: 'image/*',
	    container: 'modal',
	    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'CLOUDAPP'],
	    hide: true,
	    policy: policy,
	    signature: signature
	  },
	  function(Blob) {
		progressBar.className = '';
		progressBar.className = 'progress-bar progress-bar-success';

	    document.getElementById('filestack-url').value = Blob.url;
	  },
	  function(FPError) {
		console.log(FPError.toString());
	  },
	  function(FPProgress) {
	  	progressPercentage = parseInt(FPProgress.progress) + '%';
	  	
	  	progressBar.style.width = progressPercentage;
	  	progressBar.innerHTML = progressPercentage;
	  }
	);
};
