import { BufferGeometry } from '../core/BufferGeometry.js';
import { BufferAttribute } from '../core/BufferAttribute.js';

class CurveGeometry extends BufferGeometry {

    constructor( curve, segments = 128 ) {

        super();

        this.type = 'CurveGeometry';

        this.parameters = {
            curve: curve,
            segments: segments,
        }

        // buffers

        const nPoints = segments + 1 // no. of points
        const positions = new Float32Array( nPoints * 3 ); // 3 floats (x, y and z) per point

        // build geometry

        this.setAttribute( 'position', new BufferAttribute( positions, 3 ) );
        this.setDrawRange( 0, 0 );

    }

    updateBuffer() {

        const n = this.parameters.segments + 1
        const pts = this.parameters.curve.getPoints( n );
        const pos = this.getAttribute( 'position' );

        pos.needsUpdate = true;
        pos.updateRanges.count = n * 3;
        const arr = pos.array;
        let index = 0;

        for ( let i = 0; i < n; i ++ ) {

            arr[ index ++ ] = pts[ i ].x;
            arr[ index ++ ] = pts[ i ].y;
            arr[ index ++ ] = pts[ i ].z;

        }

        this.setDrawRange( 0, n );
        this.computeBoundingBox();
        this.computeBoundingSphere();

    }

    copy( source ) {

		super.copy( source );

		this.parameters = Object.assign( {}, source.parameters );

		return this;

	}

    toJSON() {

		const data = super.toJSON();

		const curve = this.parameters.curve;

		return toJSON( curve, data );

	}

	static fromJSON( data ) {

		return new CurveGeometry( data.curve, data.segments );

	}

}

function toJSON( curve, data ) {

	console.warn( 'not implemented yet' )

}

export { CurveGeometry };
