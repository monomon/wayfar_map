var wy_map = {
	// square grid
	gridToCoords : function (grid_coords)
	{
		var coords = {
			x : grid_coords.x*this.gridSize,
			y : grid_coords.y*this.gridSize
		};

		if (this.flipY) {
			coords.y = (this.height-grid_coords.y)*this.gridSize;
		}

		return coords;
	},

	autoResize : function ()
	{
		var map = d3.select("svg#map");
		var mapBBox = map.node().getBBox();

		map.attr("width", mapBBox.width);
		map.attr("height", mapBBox.height);
	},

	renderStars : function (bodyBBox)
	{
		var grid = this.svg.select("g.grid");

		function randomTranslate(d)
		{
			var coords = {
				x : Math.random()*bodyBBox.width,
				y : Math.random()*bodyBBox.height
			};
			return "translate("+coords.x+","+coords.y+")";
		}

		function randomRadius(d)
		{
			return Math.ceil(Math.random()*3);
		}

		for (var i=0; i<this.randomStarsCount; i++) {
			grid.append("circle")
			.classed({"rand_star" : true})
			.attr("r", randomRadius)
			.attr("transform", randomTranslate);
		}
	},

	init : function (config)
	{
		var bodyBBox = document.body.getBoundingClientRect();
		this.svg = d3.select("svg#map");
		this.width = config.width;
		this.height = config.height;
		this.gridSize = config.gridSize;
		this.flipY = config.flipY;
		this.randomStarsCount = 40;

		this.history = [];
		var margins = [30, 30];
		// var gridSize = Math.floor(bodyBBox.width / this.width);

		var lineGroup = this.svg.append("g")
		.classed({"grid" : true});

		// render stars first
		this.renderStars(bodyBBox);

		this.modal = new VanillaModal({
			page : ".modal-page"
		});

		var axes = this.svg.append("g")
		.classed({"axes" : true});

		for (var j=0; j<=this.height; j++) {
			lineGroup.append("line")
			.classed({"gridline" : true})
			.attr("x1",0)
			.attr("x2",this.height*this.gridSize)
			.attr("y1",Math.floor(j*this.gridSize) + 0.5)
			.attr("y2",Math.floor(j*this.gridSize) + 0.5);

			var position = {
				x : -10
			};

			if (this.flipY) {
				position.y = Math.floor((this.height - j)*this.gridSize) + 5;
			} else {
				position.y = Math.floor(j*this.gridSize) + 5;
			}

			axes.append("text")
			.text(j)
			.attr("transform", "translate("+
				position.x+","+position.y+")"
			);
		}

		for (var i=0; i<=this.width; i++) {
			lineGroup.append("line")
			.classed({"gridline" : true})
			.attr("x1",Math.floor(i*this.gridSize) + 0.5)
			.attr("x2",Math.floor(i*this.gridSize) + 0.5)
			.attr("y1",0)
			.attr("y2",this.width*this.gridSize);

			axes.append("text")
			.text(i)
			.attr("transform", "translate("+
				Math.floor((i)*this.gridSize)+
				","+(-10)+")"
			);
		}

		lineGroup.attr("transform", "translate("+margins[0]+","+margins[1]+")");
		axes.attr("transform", "translate("+margins[0]+","+margins[1]+")");

		this.autoResize();
	},

	initBackButton : function ()
	{
		d3.select("nav .back")
		.on("click", this.back.bind(this));
	},

	back : function ()
	{
		// go back two
		this.history.pop();
		this.render(this.history.pop(), this.systemData);
	},

	/**
	 * Render one system from the passed data
	 */
	render : function (systemName, systemData)
	{
		var bodyBBox = document.body.getBoundingClientRect();

		// cache the system data
		this.systemData = systemData;
		var system = systemData[systemName];

		this.svg.selectAll("g.planet").remove();

		var sel = this.svg.select("g.grid")
		.selectAll("g.planet")
		.data(system.places);

		var enterSel = sel.enter();

		var group = enterSel.append("g")
		.classed({"planet" : true})
		.attr("transform", function (d) {
			var coords = this.gridToCoords(d);
			return "translate("+coords.x+","+coords.y+")";
		}.bind(this));

		group.append("circle")
		.on("click", this.onPlanetClick.bind(this));

		group.append("text");

		sel.exit()
		.on("click", null)
		.remove();

		this.svg.selectAll("g.planet circle")
		.attr("fill", function (d) {
			if (!d.type) {
				d.type = "planet";
			}
			return "url(#"+d.type + "Gradient)";
		})
		.attr("r", function (d) {
			return d.size / 500;
		}.bind(this));

		this.svg.selectAll("g.planet text")
		.text(function (d) {
			return d.name;
		});

		this.autoResize();
		this.history.push(systemName);
		this.renderBreadcrumbs();
	},

	renderBreadcrumbs : function ()
	{
		var sel = d3.select("nav").selectAll("a").data(this.history);

		sel.enter().append("a")
		.text(function (d) { return "> " + d; })
		.attr("href", "#")
		.on("click", function (d, i) {
			var item = this.history.splice(i, this.history.length - i);
			item = item.shift();
			this.render(item, this.systemData);
		}.bind(this));

		sel.exit().remove();
	},

	onPlanetClick : function (d)
	{
		if (d.target && this.systemData[d.target]) {
			// if there is a target, then render that system
			this.render(d.target, this.systemData);
		} else {
			// otherwise show modal window with information
			this.showPlaceModal(d);
		}
	},

	showPlaceModal : function (d)
	{
		var modalEl = d3.select("#modal-place");
		modalEl.select("h2").text(d.name);
		modalEl.select("p").text("size: " + d.size);
		this.modal.open("#modal-place");
	},

	showBackButton : function()
	{
		d3.select("nav .back").style({
			display : "inline-block"
		});
	},

	hideBackButton : function()
	{
		d3.select("nav .back").style({
			display : "none"
		});
	}
};