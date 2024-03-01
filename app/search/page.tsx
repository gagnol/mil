import ProductItem from '@/app/components/Cards/ProductItem'
import Rating from '@/app/components/rating'
import productServices from '@/lib/productService'
import Link from 'next/link'

const sortOrders = ['newest', 'lowest', 'highest', 'rating']
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $500',
    value: '201-500',
  },
]

const ratings = [5, 4, 3, 2, 1]

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all', subcategory = "all" },
}: {
  searchParams: {
    q: string
    category: string
    subcategory: string
    price: string
    rating: string
    sort: string
    page: string
  }
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    subcategory != " 'all" ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${subcategory !== 'all' ? ` : SubCategory ${subcategory}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    }
  } else {
    return {
      title: 'Search Products',
    }
  }
}

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    subcategory = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string
    category: string
    subcategory: string
    price: string
    rating: string
    sort: string
    page: string
  }
}) {
  const getFilterUrl = ({
    c,
    sub,
    s,
    p,
    r,
    pg,
  }: {
    c?: any
    sub?: string
    s?: string
    p?: string
    r?: string
    pg?: string
  }) => {
    const params = { q, category, price, rating, sort, page, subcategory }
    if (c) params.category = c
    if (sub) params.subcategory = sub
    if (p) params.price = p
    if (r) params.rating = r
    if (pg) params.page = pg
    if (s) params.sort = s
    return `/search?${new URLSearchParams(params).toString()}`
  }
  const categories = await productServices.getCategories()

  const subcategories =await productServices.getSubcategories()
  
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    subcategory,
    q,
    price,
    rating,
    page,
    sort,
  })
  return (
    <div className="grid md:grid-cols-5 md:gap-5 mx-5 ">
      <div >
        <div className="text-xl pt-3">Department</div>
        <div >
          <ul>
            <li>
              <Link
                className={`link link-hover ${'all' === category && 'link-primary'
                  }`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((c: any) => (
              <li key={c}>
                <Link
                  className={`link link-hover ${c === category && 'link-primary'
                    }`}
                  href={getFilterUrl({ c })}
                >
                  {c}   
                </Link>
               
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl pt-3">Price</div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${'all' === price && 'link-primary'
                  }`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link link-hover ${p.value === price && 'link-primary'
                    }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='my-5'>
          <div className="text-xl pt-3">Categories</div>
          <div className="dropdown dropdown-top ">
            <div tabIndex={0} role="button" className="btn btn-primary btn-outline m-1">View Categories</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link
                  className={`link link-hover ${'all' === subcategory && 'link-primary'
                   }`}
                  href={getFilterUrl({ sub: 'all' })}
                >
                  Any
                </Link>
              </li>
              {subcategories?.map((sub: string) => (
                <li key={sub}>
                  <Link
                    className={`link link-hover ${sub === subcategory && 'link-primary'
                      }`}
                    href={getFilterUrl({ sub })}
                  >
                    {sub}
                  </Link>
                </li>
              )).slice(0,14)}
            </ul>
          </div>
        </div>
        <div className='my-5'>
          <div className="text-xl pt-3">Customer Review</div>
          <ul>
            <li>
              <Link
                href={getFilterUrl({ r: 'all' })}
                className={`link link-hover ${'all' === rating && 'link-primary'
                  }`}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r} className='flex'>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link link-hover ${`${r}` === rating && 'link-primary'
                    }`}
                >
                  <Rating value={r}></Rating>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center justify-between  py-4">
          <div className="flex items-center">
            {products.length === 0 ? 'No' : countProducts} Results
            {q !== 'all' && q !== '' && ' : ' + q}
            {category !== 'all' && ' : ' + category}
            {subcategory !== 'all' && ' : ' + subcategory}
            {price !== 'all' && ' : Price ' + price}
            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
              category !== 'all' ||
              subcategory !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
              <Link className="btn btn-sm btn-error btn-outline" href="/search">
                Clear
              </Link>
            ) : null}
          </div>
          <div>
            Sort by{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 link link-hover ${sort == s ? 'link-primary' : ''
                  } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4  xl:grid-cols-3 md:grid-cols-1">
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className="xl:join md:max-w-[500px]">
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`join-item btn ${Number(page) === p + 1 ? 'btn-active' : ''
                    } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
