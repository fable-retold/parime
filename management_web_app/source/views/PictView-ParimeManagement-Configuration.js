const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "ParimeManagement-Configuration",

	DefaultRenderable: "ParimeManagement-Configuration-Content",
	DefaultDestinationAddress: "#ParimeManagement-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.parime-config {
			padding: 2em;
			max-width: 1200px;
			margin: 0 auto;
		}
		.parime-config-header {
			margin: 0 0 1.5em 0;
			padding-bottom: 1em;
			border-bottom: 1px solid #DDD6CA;
		}
		.parime-config-header h1 {
			margin: 0 0 0.25em 0;
			font-size: 1.75em;
			font-weight: 400;
			color: #3D3229;
		}
		.parime-config-header p {
			margin: 0;
			color: #7A7568;
			font-size: 1em;
		}
		.parime-config-section {
			background: #fff;
			border: 1px solid #DDD6CA;
			border-radius: 6px;
			margin-bottom: 1.25em;
			overflow: hidden;
		}
		.parime-config-section-header {
			padding: 0.75em 1.25em;
			background: #F0ECE4;
			color: #5E5549;
			font-size: 0.85em;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			border-bottom: 1px solid #DDD6CA;
		}
		.parime-config-table {
			width: 100%;
			border-collapse: collapse;
		}
		.parime-config-table td {
			padding: 0.6em 1.25em;
			border-bottom: 1px solid #EAE3D8;
			font-size: 0.9em;
		}
		.parime-config-table tr:last-child td {
			border-bottom: none;
		}
		.parime-config-table td:first-child {
			color: #5E5549;
			font-weight: 500;
			width: 200px;
		}
		.parime-config-table td:last-child {
			color: #423D37;
		}
		.parime-config-value-code {
			font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
			font-size: 0.85em;
			color: #9E6B47;
			background: #F0ECE4;
			padding: 0.15em 0.4em;
			border-radius: 3px;
		}
		.parime-config-json {
			padding: 1.25em;
			background: #F0ECE4;
			font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
			font-size: 0.85em;
			color: #423D37;
			white-space: pre-wrap;
			word-break: break-word;
			margin: 0;
		}
		.parime-config-endpoints {
			padding: 1.25em;
		}
		.parime-config-endpoint-item {
			display: flex;
			align-items: center;
			gap: 0.75em;
			padding: 0.4em 0;
			font-size: 0.9em;
		}
		.parime-config-endpoint-badge {
			display: inline-block;
			padding: 0.15em 0.5em;
			border-radius: 3px;
			font-size: 0.75em;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.03em;
			background: #E0EDEB;
			color: #2E7D74;
		}
	`,

	Templates:
	[
		{
			Hash: "ParimeManagement-Configuration-Template",
			Template: /*html*/`
<div class="parime-config">
	<div class="parime-config-header">
		<h1>Configuration</h1>
		<p>Current server configuration and endpoint status.</p>
	</div>
	<div id="ParimeManagement-Configuration-Body">
		<p style="color: #8A7F72;">Loading configuration...</p>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "ParimeManagement-Configuration-Content",
			TemplateHash: "ParimeManagement-Configuration-Template",
			DestinationAddress: "#ParimeManagement-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class ParimeManagementConfigurationView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		this.pict.PictApplication.refreshConfiguration(() =>
		{
			let tmpConfig = this.pict.AppData.ParimeManagement.Configuration;

			let tmpHTML = '';

			// Server section
			tmpHTML += '<div class="parime-config-section">';
			tmpHTML += '<div class="parime-config-section-header">Server</div>';
			tmpHTML += '<table class="parime-config-table">';
			tmpHTML += `<tr><td>Product</td><td>${this.escapeHTML(tmpConfig.Product || 'Parime')}</td></tr>`;
			tmpHTML += `<tr><td>Version</td><td><span class="parime-config-value-code">${this.escapeHTML(tmpConfig.Version || '?')}</span></td></tr>`;
			tmpHTML += `<tr><td>Port</td><td><span class="parime-config-value-code">${tmpConfig.Port || '?'}</span></td></tr>`;
			if (tmpConfig.Uptime)
			{
				tmpHTML += `<tr><td>Uptime</td><td>${this.escapeHTML(tmpConfig.Uptime)}</td></tr>`;
			}
			if (tmpConfig.StartTime)
			{
				tmpHTML += `<tr><td>Start Time</td><td>${this.escapeHTML(tmpConfig.StartTime)}</td></tr>`;
			}
			tmpHTML += '</table>';
			tmpHTML += '</div>';

			// Storage section
			tmpHTML += '<div class="parime-config-section">';
			tmpHTML += '<div class="parime-config-section-header">Storage</div>';
			tmpHTML += '<table class="parime-config-table">';
			tmpHTML += `<tr><td>Binary Storage Root</td><td><span class="parime-config-value-code">${this.escapeHTML(tmpConfig.BinaryStorageRoot || '?')}</span></td></tr>`;
			tmpHTML += '</table>';
			tmpHTML += '</div>';

			// Restify section
			if (tmpConfig.RestifyConfiguration)
			{
				tmpHTML += '<div class="parime-config-section">';
				tmpHTML += '<div class="parime-config-section-header">Restify Configuration</div>';
				tmpHTML += `<pre class="parime-config-json">${this.escapeHTML(JSON.stringify(tmpConfig.RestifyConfiguration, null, 2))}</pre>`;
				tmpHTML += '</div>';
			}

			// Endpoints section
			tmpHTML += '<div class="parime-config-section">';
			tmpHTML += '<div class="parime-config-section-header">Endpoints</div>';
			tmpHTML += '<div class="parime-config-endpoints">';

			let tmpEndpoints = [
				{ Name: 'Record Lake', Path: '/1.0/Record/:category/:hash' },
				{ Name: 'Binary Lake', Path: '/1.0/Binary/:category/:hash' },
				{ Name: 'Combined Lake', Path: '/1.0/Combined/:category/:hash' },
				{ Name: 'WebSocket', Path: '/1.0/WebSocket/Lake' },
				{ Name: 'Server Info', Path: '/1.0/ServerInfo' }
			];

			for (let i = 0; i < tmpEndpoints.length; i++)
			{
				let tmpEndpoint = tmpEndpoints[i];
				tmpHTML += `<div class="parime-config-endpoint-item"><span class="parime-config-endpoint-badge">Active</span> <strong>${this.escapeHTML(tmpEndpoint.Name)}</strong> &mdash; <span class="parime-config-value-code">${this.escapeHTML(tmpEndpoint.Path)}</span></div>`;
			}

			tmpHTML += '</div>';
			tmpHTML += '</div>';

			this.pict.ContentAssignment.assignContent('#ParimeManagement-Configuration-Body', tmpHTML);
		});

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}

	escapeHTML(pString)
	{
		if (typeof(pString) !== 'string')
		{
			return String(pString);
		}
		return pString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
}

module.exports = ParimeManagementConfigurationView;

module.exports.default_configuration = _ViewConfiguration;
