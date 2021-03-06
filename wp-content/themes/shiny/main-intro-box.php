<?php
/**
 * Main Intro Box
 *
 */
if($e404_options['main_intro_type'] != 'none') :
	if($e404_options['main_intro_type'] == 'twitter')
		$e404_options['intro_text'] = '<p>'.$e404_options['intro_text'].'</p>';
?>
	<div id="intro" class="<?php if($e404_options['main_intro_type'] == 'twitter') echo 'twitter'; else echo 'text'; ?>-intro">
		<?php if(is_404()) : echo '<h1>'.__('Nothing Found', 'shiny').'</h1>'; else : ?>
			<?php if($e404_options['main_intro_type'] == 'title') : ?>
			<?php if(is_search()) { echo '<h1>'.__('Search', 'shiny').'</h1>'; } else { the_post(); ?>
			<h1><?php the_title(); ?></h1>
			<?php rewind_posts(); } ?>
			<?php elseif($e404_options['main_intro_type'] == 'title-excerpt') : ?>
			<?php if(is_search()) { echo '<h1>'.__('Search', 'shiny').'</h1>'; } else { the_post(); ?>
			<h1><?php the_title(); ?></h1>
			<?php $excerpt = e404_get_excerpt($post, $e404_options['excerpt_length']);
			if($excerpt) : ?>
			<p><?php echo $excerpt; ?></p>
			<?php endif; ?>
			<?php rewind_posts(); } ?>
			<?php else : ?>
			<?php echo $e404_options['intro_text']; ?>
			<?php endif; ?>
		<?php endif; ?>
		<hr class="divider divider-bbottom">
	</div>
<?php endif; ?>
