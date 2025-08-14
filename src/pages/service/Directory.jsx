import React from 'react'

const Directory = () => {
  return (
    <div className="space-y-6">
    <div className="p-6 rounded-xl border border-gray-100 bg-white">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Network Directory</h3>
      {/* <p className="text-gray-600 mb-4">Comprehensive listing of businesses in our network.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { category: 'Technology', count: '150+ companies' },
          { category: 'Healthcare', count: '89+ companies' },
          { category: 'Finance', count: '124+ companies' }
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-800">{item.category}</h4>
            <p className="text-xs text-gray-500 mt-1">{item.count}</p>
          </div>
        ))}
      </div> */}
    </div>
  </div>
  )
}

export default Directory