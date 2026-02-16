const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-Dashboard",

	DefaultRenderable: "ParimeManagement-Dashboard-Content",
	DefaultDestinationAddress: "#ParimeManagement-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.parime-dashboard {
			padding: 2em;
			max-width: 1200px;
			margin: 0 auto;
		}
		.parime-dashboard-header {
			margin: 0 0 1.5em 0;
			padding-bottom: 1em;
			border-bottom: 1px solid #DDD6CA;
		}
		.parime-dashboard-header h1 {
			margin: 0 0 0.25em 0;
			font-size: 1.75em;
			font-weight: 400;
			color: #3D3229;
		}
		.parime-dashboard-header p {
			margin: 0;
			color: #7A7568;
			font-size: 1em;
		}
		.parime-dashboard-cards {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 1.25em;
			margin-top: 1.5em;
		}
		.parime-card {
			background: #fff;
			border: 1px solid #DDD6CA;
			border-radius: 6px;
			padding: 1.5em;
			transition: box-shadow 0.2s, border-color 0.2s;
		}
		.parime-card:hover {
			box-shadow: 0 4px 12px rgba(61, 50, 41, 0.08);
			border-color: #B5AA9A;
		}
		.parime-card-icon {
			font-size: 1.75em;
			margin-bottom: 0.5em;
		}
		.parime-card h3 {
			margin: 0 0 0.5em 0;
			font-size: 1.1em;
			color: #3D3229;
		}
		.parime-card p {
			margin: 0;
			color: #7A7568;
			font-size: 0.9em;
			line-height: 1.5;
		}
		.parime-card-value {
			font-size: 1.75em;
			font-weight: 600;
			color: #2E7D74;
			margin: 0.25em 0;
		}
		.parime-card-label {
			font-size: 0.8em;
			color: #8A7F72;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-Dashboard-Template",
			Template: /*html*/`
<div class="parime-dashboard">
	<div class="parime-dashboard-header">
		<h1>Dashboard</h1>
		<p>Overview of your Parime data lake server.</p>
	</div>
	<div class="parime-dashboard-cards" id="ParimeManagement-Dashboard-Cards">
		<div class="parime-card">
			<div class="parime-card-icon">&#9881;</div>
			<h3>Server Status</h3>
			<div id="ParimeManagement-Dashboard-ServerStatus">
				<p>Loading...</p>
			</div>
		</div>
		<div class="parime-card">
			<div class="parime-card-icon">&#128203;</div>
			<h3>Record Lakes</h3>
			<div id="ParimeManagement-Dashboard-RecordLakes">
				<p>Loading...</p>
			</div>
		</div>
		<div class="parime-card">
			<div class="parime-card-icon">&#128190;</div>
			<h3>Binary Lakes</h3>
			<div id="ParimeManagement-Dashboard-BinaryLakes">
				<p>Loading...</p>
			</div>
		</div>
		<div class="parime-card">
			<div class="parime-card-icon">&#128451;</div>
			<h3>Combined Lakes</h3>
			<div id="ParimeManagement-Dashboard-CombinedLakes">
				<p>Loading...</p>
			</div>
		</div>
		<div class="parime-card">
			<div class="parime-card-icon">&#128268;</div>
			<h3>WebSocket</h3>
			<div id="ParimeManagement-Dashboard-WebSocket">
				<p class="parime-card-label">Endpoint</p>
				<p>/1.0/WebSocket/Lake</p>
			</div>
		</div>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-Dashboard-Content",
			TemplateHash: "ParimeManagement-Dashboard-Template",
			DestinationAddress: "#ParimeManagement-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementDashboardView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		// Fetch server info and update the dashboard cards
		this.pict.PictApplication.refreshServerInfo(() =>
		{
			let tmpInfo = this.pict.AppData.ParimeManagement.ServerInfo;
			let tmpServerHTML = '';
			tmpServerHTML += `<p class="parime-card-label">Product</p>`;
			tmpServerHTML += `<p>${tmpInfo.Product || 'Parime'} v${tmpInfo.Version || '?'}</p>`;
			tmpServerHTML += `<p class="parime-card-label">Port</p>`;
			tmpServerHTML += `<p>${tmpInfo.Port || '?'}</p>`;
			if (tmpInfo.Uptime)
			{
				tmpServerHTML += `<p class="parime-card-label">Uptime</p>`;
				tmpServerHTML += `<p>${tmpInfo.Uptime}</p>`;
			}
			this.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-ServerStatus', tmpServerHTML);
		});

		// Fetch lake summary and update the lake cards
		this.pict.PictApplication.refreshLakesSummary(() =>
		{
			let tmpLakes = this.pict.AppData.ParimeManagement.Lakes;

			// Record Lakes
			let tmpRecordLakes = tmpLakes.Record || [];
			let tmpRecordHTML = `<div class="parime-card-value">${tmpRecordLakes.length}</div>`;
			tmpRecordHTML += `<p class="parime-card-label">Categories</p>`;
			if (tmpRecordLakes.length > 0)
			{
				tmpRecordHTML += `<p>${tmpRecordLakes.join(', ')}</p>`;
			}
			this.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-RecordLakes', tmpRecordHTML);

			// Binary Lakes
			let tmpBinaryLakes = tmpLakes.Binary || [];
			let tmpBinaryHTML = `<div class="parime-card-value">${tmpBinaryLakes.length}</div>`;
			tmpBinaryHTML += `<p class="parime-card-label">Categories</p>`;
			if (tmpBinaryLakes.length > 0)
			{
				tmpBinaryHTML += `<p>${tmpBinaryLakes.join(', ')}</p>`;
			}
			this.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-BinaryLakes', tmpBinaryHTML);

			// Combined Lakes
			let tmpCombinedLakes = tmpLakes.Combined || [];
			let tmpCombinedHTML = `<div class="parime-card-value">${tmpCombinedLakes.length}</div>`;
			tmpCombinedHTML += `<p class="parime-card-label">Categories</p>`;
			if (tmpCombinedLakes.length > 0)
			{
				tmpCombinedHTML += `<p>${tmpCombinedLakes.join(', ')}</p>`;
			}
			this.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-CombinedLakes', tmpCombinedHTML);
		});

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = ParimeManagementDashboardView;

module.exports.default_configuration = _ViewConfiguration;
