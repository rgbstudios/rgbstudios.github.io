window.onload = function() {

	//meta.js colors
	$('*').addClass(cssClass);

  let url = new URL(window.location.href);
  let q = url.searchParams.get('q');
  if(q!='') {
    $('#navSearch').val(q);
    doSearch();
  }


  //https://stackoverflow.com/questions/12115833/adding-a-slide-effect-to-bootstrap-dropdown
  $('.dropdown').on('show.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });
  $('.dropdown').on('hide.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });

  //search
  //TODO: backspace doesnt update
  $('#navSearch').on('keydown', function(e) {
  	if(e.keyCode==13) { //enter does search
		e.preventDefault();
		window.open('../../index.html/?q=' + $('#navSearch').val(), '_self');
		$('#navSearch').select();
  	} else { //otherwise filter results
  		doSearch();
  	}
  });



  // $('#searchForm').on('submit', doSearch);


  $('#searchForm').on('submit', function(e) { //hit enter in input or click button
		e.preventDefault();
		window.open('../../index.html/?q=' + $('#navSearch').val(), '_self');
		$('#navSearch').select();
  });
  $('#navClearButton').on('click', function(e) { //todo: clicking close should remove query from url
    e.preventDefault();
    $('#navSearch').val('');
    	doSearch(); //update results
  })

}

function doSearch() {
	//TODO: remove
	return -1;
  let itemNames = document.getElementsByClassName('itemName');
  let numResults = 0;
  for(let i=0; i<itemNames.length; i++) {
    if(itemNames[i].innerHTML.toLowerCase().indexOf($('#navSearch').val().toLowerCase() )!=-1) {
      itemNames[i].parentNode.parentNode.classList.remove('invisible');
      numResults++;
    } else {
      itemNames[i].parentNode.parentNode.classList.add('invisible');

    }
  }

  if(numResults==0) {
    $('#noResultsP').html('No results found for ' + $('#navSearch').val() + '.<br>Click <a href="../../index.html">here</a> to return home.' );
  } else {
    $('#noResultsP').html('');
  }
}