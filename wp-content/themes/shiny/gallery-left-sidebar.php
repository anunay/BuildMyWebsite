<?php
/**
 * Template name: Gallery with left sidebar
 *
 */

get_header(); ?>
	
	<div id="wrapper" class="sidebar-left-wrapper">
		<div id="wrapper_inner">
	
	<?php if($e404_options['gallery_intro_type'] != 'none' || $e404_options['breadcrumbs']) echo '<div id="head_intro">'; ?>
		<?php include(OF_FILEPATH.'/gallery-intro-box.php'); ?>
		<?php if($e404_options['breadcrumbs']) : ?><div id="breadcrumb"><?php e404_breadcrumbs(); ?></div><?php endif; ?>
	<?php if($e404_options['gallery_intro_type'] != 'none' || $e404_options['breadcrumbs']) echo '</div>'; ?>
	
		<div class="gallery-default">
			<div id="sidebar" class="one_third sidebar-left">
				<?php get_sidebar('gallery'); ?>
			</div>
			<div  class="two_third last">

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
		<?php if($e404_options['page_titles']) : ?><h2 class="fancy-header"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2><?php endif; ?>
				<div id="post-<?php the_ID(); ?>">

			<?php the_content(); ?>

				</div>
<?php endwhile; ?>
			
			<?php get_template_part('navigation'); ?>

			</div>
			<br class="clear" />
			</div>
		</div>
	</div>

<?php get_footer(); ?>
