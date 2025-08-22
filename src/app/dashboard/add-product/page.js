'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { toast } from 'sonner'

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics'
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const categories = [
    'Electronics',
    'Wearables',
    'Food & Beverage',
    'Accessories',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Clothing'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to add product')
      }

      const newProduct = await response.json()
      
      toast.success('Product added successfully!', {
        description: 'Your product has been added to the store.',
      })

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Electronics'
      })

      // Redirect to products page after a delay
      setTimeout(() => {
        router.push('/products')
      }, 2000)

    } catch (error) {
      toast.error('Failed to add product', {
        description: 'Please try again or contact support if the problem persists.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill in the details below to add a new product to your store
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Enter product description"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? <LoadingSpinner /> : 'Add Product'}
              </Button>
              
              <Button
                type="button"
                onClick={() => router.push('/products')}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>

          <Card className="mt-6 bg-muted/50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-foreground mb-2">Tips:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Make sure to provide a clear and descriptive product name</li>
                <li>• Include detailed information in the description</li>
                <li>• Set a competitive price for your product</li>
                <li>• Choose the most appropriate category</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
