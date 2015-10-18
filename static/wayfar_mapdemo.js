
document.addEventListener("DOMContentLoaded", function () {
	var system_config = {
		width : 10,
		height : 10,
		gridSize : 70,
		flipY : true
	};

	var system_data = {
		"dso-1212" : {
			places : [{
				name : "wy-1444",
				size : 10000,
				x : 4,
				y : 9,
				target : "wy-1444"
			}, {
				name : "frog-1322",
				size : 7000,
				x : 3,
				y : 3,
				target : "frog-1322"
			},{
				name : "central complex alpha",
				size : 7000,
				x : 3,
				y : 8
			}, {
				name : "ae-2581 / 17-Egret",
				size : 7000,
				x : 2,
				y : 5,
				target : "17-egret"
			}, {
				name : "dso-1212 Primary",
				size : 20000,
				x : 5,
				y : 5,
				type : "star"
			}, {
				name : "asteroid belt zone / 7-bluejay",
				size : 10000,
				x : 4,
				y : 4,
				type : "asteroid"
			}, {
				name : "warp gate to wdx-78",
				size : 7000,
				x : 1,
				y : 1,
				type : "warp",
				target : "wdx-78"
			}, {
				name : "warp gate to alp-3925",
				size : 7000,
				x : 5,
				y : 1,
				type : "warp",
				target : "alp-3925"
			}]
		},
		"wy-1444" : {
			places : [{
				name : "wy-1444",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}]
		},
		"17-egret" : {
			places : [{
				name : "17-egret",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}, {
				name : "moon",
				size : 5000,
				x : 2,
				y : 4,
				type : "moon"
			}]
		},
		"frog-1322" : {
			places : [{
				name : "frog-1322",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}, {
				name : "moon",
				size : 5000,
				x : 3,
				y : 4,
				type : "moon"
			}, {
				name : "moon",
				size : 5000,
				x : 7,
				y : 9,
				type : "moon"
			}]
		},
		"wdx-78" : {
			places : [{
				name : "wdx-78 primary",
				size : 20000,
				x : 7,
				y : 6,
				type : "star"
			}, {
				name : "fr-1599",
				size : 10000,
				x : 8,
				y : 6,
				type : "planet",
				target : "fr-1599"
			}, {
				name : "np-2001",
				size : 10000,
				x : 9,
				y : 2,
				type : "planet",
				target : "np-2001"
			}]
		},
		"fr-1599" : {
			places : [{
				name : "fr-1599",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}, {
				name : "moon",
				size : 5000,
				x : 1,
				y : 1,
				type : "moon"
			}, {
				name : "phedyne moon",
				size : 5000,
				x : 2,
				y : 8,
				type : "moon"
			}, {
				name : "dygina moon",
				size : 5000,
				x : 9,
				y : 10,
				type : "moon"
			}]
		},
		"np-2001" : {
			places : [{
				name : "np-2001",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}, {
				name : "mygdon moon",
				size : 5000,
				x : 9,
				y : 3,
				type : "moon"
			}]
		},
		"exa-45" : {
			places : [{
				name : "dos-1180 primary",
				size : 20000,
				x : 4,
				y : 5,
				type : "star"
			}, {
				name : "ln-1502",
				size : 10000,
				x : 3,
				y : 2,
				type : "planet",
				target : "ln-1502"
			}, {
				name : "oe-1393",
				size : "10000",
				x : 6,
				y : 1,
				type : "planet",
				target : "oe-1393"
			}]
		},
		"ln-1502" : {
			places : [{
				name : "ln-1502",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}, {
				name : "moon",
				size : 5000,
				x : 7,
				y : 1,
				type : "moon"
			}]
		},
		"oe-1393" : {
			places : [{
				name : "oe-1393",
				size : 10000,
				x : 5,
				y : 5,
				type : "planet"
			}, {
				name : "moon",
				size : 5000,
				x : 4,
				y : 8,
				type : "moon"
			}]
		},
		"alp-3925" : {
			places : [{
				name : "alpha-1184",
				type : "star",
				x : 5,
				y : 6,
				size : 20000
			}, {
				name : "tl-2173",
				type : "planet",
				x : 5,
				y : 8,
				size : 10000,
				target : "tl-2173"
			}, {
				name : "hd-1412",
				type : "planet",
				size : 10000,
				x : 3,
				y : 9,
				target : "hd-1412"
			}]
		},
		"tl-2173" : {
			places : [{
				name : "ziton moon",
				size : 5000,
				x : 3,
				y : 8,
				type : "moon"
			}, {
				name : "hydroxious moon",
				size : 5000,
				x : 2,
				y : 10,
				type : "moon"
			}, {
				name : "digixo moon",
				size : 5000,
				x : 9,
				y : 6,
				type : "moon"
			}]
		},
		"hd-1412" : {
			places : [{
				name : "phedyne moon",
				size : 5000,
				x : 7,
				y : 2,
				type : "moon"
			}]
		}
	};

	wy_map.init(system_config);
	wy_map.render("dso-1212", system_data);
});