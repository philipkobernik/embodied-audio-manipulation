# Embodied Audio Manipulation

This repo contains MAX patches created during the development of my audio sampler engine for MAT 540C Fall 2019 @ University of California, Santa Barbara.

## Polyphany

Vox Augmento as it appeared at NIME 2018 allowed a certain kind of interaction:

* user creates multiple sample buffers in space, 0..48
* user can trace a line through space, intersecting with multiple sample buffers
* each sample buffer is triggered in sequence, and the granular playback voice has a medium-length release, so the sounds fade out

This required a polyphonic voice engine-- which is what I still have today.

The "scrub" interaction gesture is a fan-shaped hand colliding with a sample buffer object. Ostensibly, it still makes sense to have polyphany capibilites.

### Continuous vs Discrete events

Discrete playback message is received as a simple bufferId (currently a buffer index value) that simply plays back the buffer start to end.

The scrubbed interaction is continuous: there is a scrub start, a scrub play-head-position adjustment, and a scrub end.

Scrub OSC messages look like: "/scrub <int>index <boolean>scrubbing <float> position"

* enter buffer (start scrubbing): /scrub 6 1 0.2
	* if voice allocation was dynamic:
		* audio engine allocate the poly voice
		* set state indicating that future messages for buffer 6 should go to this voice
	* one voice dedicated per-buffer approach:
		* buffer id 6 simply maps to voice 6

* adjust playhead-position: /scrub 6 1 0.3
	* updates buffer offset for scrubbing through the sample
	* each scrub message fires an amplitude envelope with a relatively long release, keeping the envelope "open" while the scrub position is moving

* exit buffer (stop scrubbing): /scrub 6 0 0.3
	* sound amplitude envelope release

