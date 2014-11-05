{{ Form::open([
	'url'    => 'search/'.$currentManual.'/'.$currentVersion,
	'method' => 'GET',
	'class'  => 'navbar-form pull-right',
	'role'   => 'search'
]) }}
	<div class="input-group">
		<input type="text" name="q" class="form-control" required>
		<span class="input-group-btn">
			<button class="btn btn-primary" type="submit">
				<span class="glyphicon glyphicon-search"></span> Search
			</button>
		</span>
	</div>
{{ Form::close() }}
