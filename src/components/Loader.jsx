import React from 'react'

export default function Loader({ relative }) {
    return (
        <div className="loader top-1 ml-[2px]" style={relative ? { position: 'relative' } : { position: 'absolute', top:'12px', right:'1.25rem' }}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
        </div>
    )
}
