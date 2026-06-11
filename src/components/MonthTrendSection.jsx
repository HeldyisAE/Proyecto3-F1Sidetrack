import '../styles/MonthTrendSection.css'
import '../data/products.js'


import ProductCard from './ProductCard';

function MonthTrendSection({ products, onProductSelect }) {
  return (
    <section className="monthtrend-section">
        
      <div className="monthtrend-header">
        <span className="section-label">
          Monthly Trends
        </span>

        <h2 className="monthtrend-title">
          Most Popular This Month
        </h2>
      </div>

      <div className="monthtrend-container">
        
        {products.filter(product => product.trending).map(product => (
          <ProductCard
            variant="carousel"
            key={product.id}
            product={product}
            onClick={() => onProductSelect(product)}
          />
        ))} 
      </div>
    </section>
  );
}

export default MonthTrendSection;