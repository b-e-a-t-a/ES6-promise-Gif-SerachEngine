var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = '5r6mgQxzp4m2JNHqKJ4XIYSs6dRzNyLv';

App = React.createClass({

    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        }
    },
    getGif: function(searchingText) {  
    	var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
	    	return new Promise((resolve, reject) => {
    			const xhr = new XMLHttpRequest();
    			xhr.onload = function() {
    				if (this.status === 200) {
	                    var data = JSON.parse(xhr.responseText).data;
	                    var gif = {
	                        url: data.fixed_width_downsampled_url,
	                        sourceUrl: data.url
	                    };
	                    resolve(gif);
    				} else {
                    	reject(new Error(xhr.status));
    				}
    			}
    			xhr.open('GET', url);
    			xhr.send();
	    	});
	 },
	handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText)
            .then((gif) => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
            .catch(error => console.log(error));
	},

	render: function() {

//style dodane inline a nie poprzez className; obiekt o dowolnej nazwie
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Gifs Search Engine</h1>
				<p>Find a giph on <a href='http://giphy.com'>giphy</a>. Press enter to load more giphs.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif
				    loading={this.state.loading}
				    url={this.state.gif.url}
				    sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});
