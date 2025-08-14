import React from 'react'

const LatestNews = () => {
  return (
    <div className="space-y-6">
    <div className="p-6 rounded-xl border border-gray-100 bg-white">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Announcements</h3>
      {/* <div className="space-y-4">
        {[
          { 
            title: 'SIGA Fair 2025', 
            desc: '30th anniversary celebration with new features', 
            time: '2 hours ago',
            accent: 'blue'
          },
          { 
            title: 'New Partnerships', 
            desc: 'Strategic opportunities for business growth', 
            time: '1 day ago',
            accent: 'indigo'
          }
        ].map((news, i) => (
          <article key={i} className={`p-4 rounded-lg border-l-2 border-${news.accent}-400 bg-white`}>
            <h4 className="font-medium text-gray-800">{news.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{news.desc}</p>
            <span className="text-xs text-gray-400 mt-2 block">{news.time}</span>
          </article>
        ))}
      </div> */}
    </div>
  </div>
  )
}

export default LatestNews