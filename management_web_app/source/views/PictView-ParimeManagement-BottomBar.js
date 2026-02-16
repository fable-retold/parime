const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-BottomBar",

	DefaultRenderable: "ParimeManagement-BottomBar-Content",
	DefaultDestinationAddress: "#ParimeManagement-BottomBar-Container",

	AutoRender: false,

	CSS: /*css*/`
		.parime-bottombar {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #F0ECE4;
			color: #8A7F72;
			padding: 0.75em 1.5em;
			font-size: 0.8em;
			border-top: 1px solid #DDD6CA;
		}
		.parime-bottombar a {
			color: #2E7D74;
			margin-left: 0.5em;
		}
		.parime-bottombar a:hover {
			color: #256861;
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-BottomBar-Template",
			Template: /*html*/`
<div class="parime-bottombar">
	Parime Data Lake &mdash; Management Console &mdash;
	<a href="https://github.com/stevenvelozo/parime" target="_blank">GitHub</a>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-BottomBar-Content",
			TemplateHash: "ParimeManagement-BottomBar-Template",
			DestinationAddress: "#ParimeManagement-BottomBar-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementBottomBarView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = ParimeManagementBottomBarView;

module.exports.default_configuration = _ViewConfiguration;
