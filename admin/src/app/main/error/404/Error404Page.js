import { FuseAnimate } from '@fuse';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        background: 'black'
	},
	title: {
		color: 'white'
	},
	detail: {
		color: '#ffffff8f !important'
	}
});

function Error404Page(props) {
	const {classes} = props

	return (
		<div className={classNames(classes.root, "flex flex-col flex-1 items-center justify-center p-16")}>
			<div className="max-w-512 text-center">
				<FuseAnimate animation="transition.expandIn" delay={100}>
					<Typography variant="h1" className={classNames(classes.title, "font-medium mb-16")}>
						404
					</Typography>
				</FuseAnimate>

				<FuseAnimate delay={500}>
					<Typography variant="h5" className={classNames(classes.detail, "mb-16")}>
						Sorry but we could not find the page you are looking for
					</Typography>
				</FuseAnimate>

				<Link className={classNames(classes.detail, "font-medium")} to="/home">
					Go back to home
				</Link>
			</div>
		</div>
	);
}

export default  withStyles(styles, {withTheme: true})(Error404Page);
