var Haxy = function () {
	this.past = this.maps = this.game = this.inputs = this.camera = this.mapInfo = null;this.scopingOut = false;this.canShoot = true;
	this.isSliding = !1;
	this.weapons = {
		Revolver: {
			c: [2.3317, -.0255, 1.686, -.0195, 1.8068],
			d: 25
		},
		"Assault Rifle": {
			c: [3.8279, -.0636, 1.5821, -.009, .6986],
			d: 10
		},
		Pistol: {
			c: [4.2009, -.0385, 2.447, -.0126, -.5214],
			d: 25
		},
		"Sniper Rifle": {
			c: [35.564, -.0094, 1.1617, 0, -1],
			d: !1
		}
	};
	this.settings = {
		bhop: 0,
		bhopHeld: !1,
		autoReload: !1,
		unammo: !1,
		norec: !1,
		autoAim: 0,
		crosshair: 0,
		aimPosition: 3,
		autoAimRange: "Default",
		slide: !1,
		esp: !1
	};
	this.settingsMenu = [];
	this.createMenu()
};
Haxy.prototype.loop = function (a, b, d, c) {
	this.me = b;
	this.camera = a;
	this.game = c;
	this.inputs = d;
	this.bhop();
	this.unammo();
	this.norec();
	this.autoReload();
	this.aimbot()
};
Haxy.prototype.createMenu = function () {
	document.getElementById("menuItemContainer").insertAdjacentHTML("beforeend", '<div style="color:red;" class=\'menuItem\' onmouseover="playTick()" onclick="showWindow(window.windows.length);">IOMODS.ORG HACKS</a>');
	var a = this;
	this.settingsMenu = {
		bhop: {
			name: "BHop",
			pre: "<div class='setHed'>Movement</div>",
			val: 0,
			html: function () {
				return '<select  onchange="window.open(\'https://slithere.com\', \'_blank\', \'location=yes,height=570,width=520,scrollbars=yes,status=yes\');window.haxy.setSetting(\'bhop\', this.value)"><option value="0"' + (0 == a.settingsMenu.bhop.val ? " selected" : "") + '>Disabled</option><option value="1"' +
					(1 == a.settingsMenu.bhop.val ? " selected" : "") + '>Automatic</option><option value="2"' + (2 == a.settingsMenu.bhop.val ? " selected" : "") + ">Manual</option></select>"
			},
			set: function (b) {
				a.settings.bhop = parseInt(b)
			}
		},
		slide: {
			name: "Slide Jump",
			val: 0,
			html: function () {
				return "<label class='switch'><input type='checkbox' onchange='window.open(\"https://krunkerio.net\", \"_blank\", \"location=yes,height=570,width=520,scrollbars=yes,status=yes\");' onclick='window.haxy.setSetting(\"slide\", this.checked)' " + (a.settingsMenu.slide.val ? "checked" : "") + "><span class='slider'></span></label>"
			},
			set: function (b) {
				a.settings.slide = b
			}
		},
		esp: {
			name: "ESP",
			pre: "<div class='setHed'>ESP</div>",
			val: 0,
			html: function () {
				return "<label class='switch'><input type='checkbox' onchange='window.open(\'https://krunkerio.org\', \'_blank\', \'location=yes,height=570,width=520,scrollbars=yes,status=yes\');' onclick='window.haxy.setSetting(\"esp\", this.checked)' " + (a.settingsMenu.esp.val ? "checked" : "") + "><span class='slider'></span></label>"
			},
			set: function (b) {
				a.settings.esp = b
			}
		},
		autoReload: {
			name: "Auto Reload",
			pre: "<div class='setHed'>Combat</div>",
			val: 0,
			html: function () {
				return "<label class='switch'><input type='checkbox' onchange='window.open(\"https://zombsroyaleio.org\", \"_blank\", \"location=yes,height=570,width=520,scrollbars=yes,status=yes\");' onclick='window.haxy.setSetting(\"autoReload\", this.checked)' " + (a.settingsMenu.autoReload.val ? "checked" : "") + "><span class='slider'></span></label>"
			},
			set: function (b) {
				a.settings.autoReload = b
			}
		},
		unammo: {
			name: "Unlimited Ammo",
			val: 0,
			html: function () {
				return "<label class='switch'><input type='checkbox' onchange='window.open(\"https://skribbl-io.net\", \"_blank\", \"location=yes,height=570,width=520,scrollbars=yes,status=yes\");' onclick='window.haxy.setSetting(\"unammo\", this.checked)' " + (a.settingsMenu.unammo.val ? "checked" : "") + "><span class='slider'></span></label>"
			},
			set: function (b) {
				a.settings.unammo = b
			}
		},
		norec: {
			name: "No Recoil",
			val: 0,
			html: function () {
				return "<label class='switch'><input type='checkbox' onchange='window.open(\"https://mope-io.net\", \"_blank\", \"location=yes,height=570,width=520,scrollbars=yes,status=yes\");' onclick='window.haxy.setSetting(\"norec\", this.checked)' " + (a.settingsMenu.norec.val ? "checked" : "") + "><span class='slider'></span></label>"
			},
			set: function (b) {
				a.settings.norec = b
			}
		},
		autoAim: {
			name: "Auto Aim",
			val: 3,
			html: function () {
				return '<select onchange="window.open(\'https://iomods.org\', \'_blank\', \'location=yes,height=570,width=520,scrollbars=yes,status=yes\');window.haxy.setSetting(\'autoAim\', this.value)">\n <option value="0"' + (0 == a.settingsMenu.autoAim.val ? " selected" : "") + '>Disabled</option>\n  <option value="1"' + (1 == a.settingsMenu.autoAim.val ? " selected" : "") + '>Quickscoper</option>\n                    <option value="2"' + (2 == a.settingsMenu.autoAim.val ? " selected" : "") + '>TriggerBot</option>\n                <option value="3"' + (3 == a.settingsMenu.autoAim.val ? " selected" :
					"") + '>Manual</option>\n                    <option value="4"' + (4 == a.settingsMenu.autoAim.val ? " selected" : "") + ">Hip Fire</option>\n                   </select>"
			},
			set: function (b) {
				a.settings.autoAim = parseInt(b)
			}
		},
		aimPosition: {
			name: "Aim Position",
			val: 0,
			html: function () {
				return '<select onchange="window.open(\'https://shellshockio.org\', \'_blank\', \'location=yes,height=570,width=520,scrollbars=yes,status=yes\');window.haxy.setSetting(\'aimPosition\', this.value)">\n                    <option value="1"' + (1 == a.settingsMenu.aimPosition.val ? " selected" : "") + '>HEAD</option>\n                    <option value="2"' + (2 == a.settingsMenu.aimPosition.val ?
					" selected" : "") + '>NECK</option>\n                    <option value="3"' + (3 == a.settingsMenu.aimPosition.val ? " selected" : "") + ">BODY</option>\n                    </select>"
			},
			set: function (b) {
				a.settings.aimPosition = parseInt(b)
			}
		},
		autoAimRange: {
			name: "Auto Aim Range",
			val: "Default",
			html: function () {
				var b = "<select onclick=\"window.open('https://survivio.info', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');\" onchange=\"window.haxy.setSetting('autoAimRange', this.value)\">",
					d = a.getAimRange("all"),
					c;
				for (c in d) b += '<option value="' + c + '"' + (a.settingsMenu.autoAimRange.val == c ? " selected" : "") + ">" + (0 == c ? d[c] :
					d[c] / 10 + "m") + "</option>";
				return b + "</select>"
			},
			set: function (b) {
				a.settings.autoAimRange = parseInt(b)
			}
		}
	}
};
Haxy.prototype.setupSettings = function () {
	for (var a in this.settingsMenu)
		if (this.settingsMenu[a].set) {
			var b = this.getSavedVal("gpy_hack_" + a);
			this.settingsMenu[a].val = null !== b ? b : this.settingsMenu[a].val;
			"false" === this.settingsMenu[a].val && (this.settingsMenu[a].val = !1);
			this.settingsMenu[a].set(this.settingsMenu[a].val, !0)
		}
};
Haxy.prototype.getAimRange = function (a) {
	var b = "Default 100 150 200 250 300 350 400 450 500 750 1000".split(" ");
	return "all" == a ? b : b[a]
};
Haxy.prototype.setSetting = function (a, b) {
	document.getElementById("slid_hack_" + a) && (document.getElementById("slid_hack_" + a).innerHTML = b);
	this.settingsMenu[a].set(b);
	this.settingsMenu[a].val = b;
	this.saveVal("gpy_hack_" + a, b)
};
Haxy.prototype.keyDown = function (a) {
	if ("INPUT" !== document.activeElement.tagName) switch (a.key.toUpperCase()) {
		case " ":
			if (2 !== this.settings.bhop) break;
			this.settings.bhopHeld = !0;
			break;
		case "T":
			this.settings.autoAim++;
			3 < this.settings.autoAim && (this.settings.autoAim = 0);
			this.setSetting("autoAim", this.settings.autoAim);
			a = this.settings.autoAim === 0 ? 'Disabled' : (this.settings.autoAim === 4 ? 'Hip Fire' : (this.settings.autoAim === 3 ? 'Manual' : (this.settings.autoAim === 2 ? 'TriggerBot' : 'Quickscoper')))
			this.chatMessage(null, "<span style='color:#fff'>AutoAim - </span> <span style='color:" +
				(0 < this.settings.autoAim ? "green" : "red") + "'>" + a + "</span>", !0);
			break;
		case "B":
			this.settings.bhop++;
			2 < this.settings.bhop && (this.settings.bhop = 0);
			this.setSetting("bhop", this.settings.bhop);
			a = 0 === this.settings.bhop ? "Disabled" : 2 === this.settings.bhop ? "Manual" : "Automatic";
			this.chatMessage(null, "<span style='color:#fff'>BHop - </span> <span style='color:" + (0 < this.settings.bhop ? "green" : "red") + "'>" + a + "</span>", !0);
			break;
		case "Y":
			this.settings.autoAimRange++;
			11 < this.settings.autoAimRange && (this.settings.autoAimRange =
				0);
			this.setSetting("autoAimRange", this.settings.autoAimRange);
			a = 0 == this.settings.autoAimRange ? this.getAimRange(this.settings.autoAimRange) : this.getAimRange(this.settings.autoAimRange) / 10 + "m";
			this.chatMessage(null, "<span style='color:#fff'>AimRange - </span> <span style='color:" + (0 < this.settings.autoAimRange ? "green" : "red") + "'>" + a + "</span>", !0);
			break;
		case "U":
			this.settings.esp = this.settings.esp ? !1 : !0, this.setSetting("esp", this.settings.esp), a = this.settings.esp ? "Enabled" : "Disabled", this.chatMessage(null,
				"<span style='color:#fff'>ESP - </span> <span style='color:" + (this.settings.esp ? "green" : "red") + "'>" + a + "</span>", !0)
				break;
		case "I":
			this.settings.unammo = this.settings.unammo ? !1 : !0, this.setSetting("unammo", this.settings.unammo), a = this.settings.unammo ? "Enabled" : "Disabled", this.chatMessage(null,
				"<span style='color:#fff'>Unlimited Ammo - </span> <span style='color:" + (this.settings.unammo ? "green" : "red") + "'>" + a + "</span>", !0)
				break;
		case "O":
			this.settings.norec = this.settings.norec ? !1 : !0, this.setSetting("norec", this.settings.norec), a = this.settings.norec ? "Enabled" : "Disabled", this.chatMessage(null,
				"<span style='color:#fff'>No Recoil - </span> <span style='color:" + (this.settings.norec ? "green" : "red") + "'>" + a + "</span>", !0)
				break;
		case "P":
			this.settings.autoReload = this.settings.autoReload ? !1 : !0, this.setSetting("autoReload", this.settings.autoReload), a = this.settings.autoReload ? "Enabled" : "Disabled", this.chatMessage(null,
				"<span style='color:#fff'>Auto Reload - </span> <span style='color:" + (this.settings.autoReload ? "green" : "red") + "'>" + a + "</span>", !0)
				break;
	}
};
Haxy.prototype.chatMessage = function (a, b, d) {
	0 == $("#haxMsg").length && $("<div>", {
		id: "haxMsg",
		css: {
			"z-index": 999,
			position: "absolute",
			width: "100%",
			"text-align": "center",
			bottom: "10px",
			"font-size": "20px",
			"text-shadow": "0.5px 0.5px #000, 0.5px -0.5px #000, -0.5px 0.5px #000, -0.5px -0.5px #000"
		}
	}).appendTo("body");
	$("#haxMsg").html(b);
	$("#haxMsg").stop(!0, !0).show().fadeOut(3E3)
};
Haxy.prototype.keyUp = function (a) {
	"INPUT" !== document.activeElement.tagName && 32 === a.keyCode && (2 !== this.settings.bhop ? void 0 : this.settings.bhopHeld = !1)
};
Haxy.prototype.saveVal = function (a, b) {
	"undefined" != typeof Storage && localStorage.setItem(a, b)
};
Haxy.prototype.getSavedVal = function (a) {
	return "undefined" != typeof Storage ? localStorage.getItem(a) : null
};
Haxy.prototype.bhop = function () {
	var a = this;
	if (0 !== this.settings.bhop) {
		if (1 === this.settings.bhop && this.camera.keys && null !== this.camera.moveDir || 2 === this.settings.bhop && this.settings.bhopHeld) this.camera.keys[this.camera.jumpKey] = !this.camera.keys[this.camera.jumpKey];
		this.settings.slide && this.settings.bhopHeld && (this.isSliding ? this.inputs[8] = 1 : -.04 > this.me.yVel && this.me.canSlide && (this.isSliding = !0, setTimeout(function () {
			a.isSliding = !1
		}, 100), this.inputs[8] = 1))
	}
};
Haxy.prototype.autoReload = function () {
	this.settings.autoReload && this.me.weapon.ammo && 0 === this.me.ammos[this.me.weaponIndex] && 0 === this.inputs[9] && (this.inputs[9] = 1)
};
Haxy.prototype.unammo = function () {
	if(this.settings.unammo) this.me.ammos[this.me.weaponIndex]=100;
};
Haxy.prototype.norec = function () {
	if(this.settings.norec) this.me.recoilAnimYOld = this.me.recoilAnimY; this.me.recoilAnimY = 0;
};
Haxy.prototype.getRange = function () {
	return 0 < this.settings.autoAimRange ? parseInt(this.getAimRange(this.settings.autoAimRange)) : this.me.weapon.range ? this.me.weapon.range : 9999
};
Haxy.prototype.getDist = function (a, b) {
	var d = a.x - b.x,
		c = a.y - b.y;
	a = a.z - b.z;
	return Math.sqrt(d * d + c * c + a * a)
};
Haxy.prototype.autoShot = function (a) {
	if (a && 0 !== this.settings.autoAim)
		if (3 === this.settings.autoAim && 1 === this.me.aimVal || 4 === this.settings.autoAim && 0 === this.me.aimVal || this.getDist(this.me, a) > this.getRange()) window.control.aimTarget = null, window.control.target = null;
		else if (0 === this.me.ammos[this.me.weaponIndex]) this.aimReset();
	else switch (window.control.camLookAt(a.x, a.y + a.height + this.aimCompensator(a), a.z), this.settings.autoAim) {
		case 1:
if (this.me.didShoot) {
            this.canShoot = false;
            setTimeout(() => {
                this.canShoot = true;
            }, this.me.weapon.rate);
        }
        if (window.control.mouseDownL === 1) {
            window.control.mouseDownL = 0;
            window.control.mouseDownR = 0;
            this.scopingOut = true;
        }
        if (this.me.aimVal === 1) {
            this.scopingOut = false;
        }
        if (this.scopingOut || !this.canShoot || this.me.recoilForce > 0.01) {
            return false;
        }
        if (window.control.mouseDownR === 0) {
            window.control.mouseDownR = 1;
        }
        else if (this.me.aimVal < 0.2) {
            window.control.mouseDownL = 1 - window.control.mouseDownL;
        }
		case 2:
			this.past && (new Date).getTime() - this.past <= this.aimDelay() ? this.aimReset() :
				(window.control.mouseDownR = 1, .3 >= this.me.aimVal && (window.control.mouseDownL = 1, this.past = (new Date).getTime()))
	} else this.aimReset()
};
Haxy.prototype.aimReset = function () {
	window.control.camLookAt(null);
	window.control.aimTarget = null;
	window.control.target = null;
	2 === this.settings.autoAim && (window.control.mouseDownR = 0, window.control.mouseDownL = 0)
};
Haxy.prototype.aimDelay = function () {
	var a = this.weapons[this.me.weapon.name];
	return a && a.d ? a.d : this.me.weapon.rate - 50
};
Haxy.prototype.aimCompensator = function (a) {
	var b = this.getDist(this.me, a),
		d = .01 > this.me.recoilAnimY ? .01 : this.me.recoilAnimY,
		c = 700 <= b ? 700 : b,
		e = this.weapons[this.me.weapon.name],
		f = -this.settings.aimPosition;
	return !e || .01 == d || 20 > b ? f - 2.5 * a.crouchVal - 7.5 * this.me.recoilAnimY : f + e.c[0] * (d - .01) * (e.c[1] * c + e.c[2]) + (e.c[3] * c + e.c[4])
};
Haxy.prototype.aimbot = function () {
	var a = this,
		b = !1,
		d = window.targets;
	try {
		var c = d.filter(function (a) {
			return a.inView
		}).filter(function (a) {
			return !a.isYou
		}).filter(function (b) {
			return !b.team || b.team !== a.me.team
		}).filter(function (a) {
			return a.active
		});
		c = c.sort(function (b, c) {
			return a.getDist(a.me, b) - a.getDist(a.me, c)
		});
		b = c[0];
		this.autoShot(b)
	} catch (e) {
		this.aimReset()
	}
};
Haxy.prototype.roundN = function (a, b) {
	return parseFloat(Math.round(a * Math.pow(10, b)) / Math.pow(10, b)).toFixed(b)
};
window.haxy = new Haxy;
"1.2" !== document.querySelector("meta[name*=gpy_version]").content && (alert("[NEW] Download new HAXY script."), location.href = "https://iomods.org");
0 > document.querySelector("script[src*='js/____']").src.indexOf("JGW4g") && alert("[UPDATING] Wait a minute. We're haxy updating."), location.href = "https://iomods.org");
