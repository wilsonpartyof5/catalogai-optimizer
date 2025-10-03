import React, { useState, useEffect } from 'react'
import {
  Modal,
  Card,
  Text,
  Button,
  Badge,
  DataTable,
  ProgressBar,
  InlineStack,
  BlockStack,
  Spinner,
  Toast,
  Box,
  Divider,
  Icon
} from '@shopify/polaris'
import { 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  XCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@shopify/polaris-icons'

interface HealthGap {
  field: string
  severity: 'warning' | 'error' | 'critical'
  count: number
  products: string[]
  fixable: boolean
}

interface HealthTrend {
  date: string
  score: number
  totalProducts: number
  validProducts: number
}

interface HealthCheckResult {
  score: number
  totalProducts: number
  validProducts: number
  gaps: HealthGap[]
  trends: HealthTrend[]
  timestamp: string
}

interface HealthCheckModalProps {
  isOpen: boolean
  onClose: () => void
  jobId?: string
  currentScore?: number
  currentGaps?: HealthGap[]
}

export function HealthCheckModal({ 
  isOpen, 
  onClose, 
  jobId, 
  currentScore = 0, 
  currentGaps = [] 
}: HealthCheckModalProps) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<HealthCheckResult | null>(null)
  const [toast, setToast] = useState<{ content: string; error?: boolean } | null>(null)
  const [autoFixing, setAutoFixing] = useState(false)

  useEffect(() => {
    if (isOpen && jobId) {
      fetchResults()
    }
  }, [isOpen, jobId])

  const fetchResults = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('action', 'get-results')
      formData.append('jobId', jobId!)

      const response = await fetch('/api/health-check', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success && data.result) {
        setResults(data.result)
      } else {
        setToast({ content: data.error || 'Failed to fetch results', error: true })
      }
    } catch (error) {
      setToast({ content: 'Failed to fetch results', error: true })
    } finally {
      setLoading(false)
    }
  }

  const handleAutoFix = async () => {
    if (!results) return

    const fixableGaps = results.gaps.filter(gap => gap.fixable)
    if (fixableGaps.length === 0) {
      setToast({ content: 'No fixable gaps found', error: true })
      return
    }

    setAutoFixing(true)
    try {
      const formData = new FormData()
      formData.append('action', 'auto-fix')
      formData.append('gapTypes', JSON.stringify(fixableGaps.map(gap => gap.field)))

      const response = await fetch('/api/health-check', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setToast({ content: `Auto-fix initiated for ${fixableGaps.length} gaps` })
        // Refresh results after a delay
        setTimeout(fetchResults, 2000)
      } else {
        setToast({ content: data.error || 'Auto-fix failed', error: true })
      }
    } catch (error) {
      setToast({ content: 'Auto-fix failed', error: true })
    } finally {
      setAutoFixing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success'
    if (score >= 70) return 'warning'
    return 'critical'
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return XCircleIcon
      case 'error':
        return AlertTriangleIcon
      case 'warning':
        return AlertTriangleIcon
      default:
        return CheckCircleIcon
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'critical'
      case 'error':
        return 'critical'
      case 'warning':
        return 'warning'
      default:
        return 'success'
    }
  }

  const formatTrend = (trends: HealthTrend[]) => {
    if (trends.length < 2) return null
    
    const latest = trends[trends.length - 1]
    const previous = trends[trends.length - 2]
    const diff = latest.score - previous.score
    
    return {
      value: diff,
      icon: diff >= 0 ? TrendingUpIcon : TrendingDownIcon,
      color: diff >= 0 ? 'success' : 'critical'
    }
  }

  const gapsTableRows = results?.gaps.map((gap, index) => [
    <InlineStack key={index} gap="200" align="start">
      <Icon source={getSeverityIcon(gap.severity)} />
      <Text variant="bodyMd" fontWeight="medium">{gap.field}</Text>
    </InlineStack>,
    <Badge key={`badge-${index}`} status={getSeverityColor(gap.severity)}>
      {gap.severity}
    </Badge>,
    gap.count,
    gap.fixable ? 'Yes' : 'No'
  ]) || []

  const trendsTableRows = results?.trends.slice(-7).map((trend, index) => [
    new Date(trend.date).toLocaleDateString(),
    `${trend.score}%`,
    trend.totalProducts,
    trend.validProducts
  ]) || []

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        title="Health Check Results"
        size="large"
      >
        <Modal.Section>
          {loading ? (
            <InlineStack align="center">
              <Spinner size="large" />
              <Text variant="bodyMd">Analyzing your catalog...</Text>
            </InlineStack>
          ) : results ? (
            <BlockStack gap="400">
              {/* Summary Card */}
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="headingMd">Overall Health Score</Text>
                    <Badge status={getScoreColor(results.score)}>
                      {results.score}%
                    </Badge>
                  </InlineStack>
                  
                  <ProgressBar 
                    progress={results.score} 
                    size="large" 
                    color={getScoreColor(results.score)}
                  />
                  
                  <InlineStack gap="400" align="start">
                    <Box>
                      <Text variant="bodyMd" color="subdued">Total Products</Text>
                      <Text variant="headingMd">{results.totalProducts}</Text>
                    </Box>
                    <Box>
                      <Text variant="bodyMd" color="subdued">Valid Products</Text>
                      <Text variant="headingMd">{results.validProducts}</Text>
                    </Box>
                    <Box>
                      <Text variant="bodyMd" color="subdued">Issues Found</Text>
                      <Text variant="headingMd">{results.gaps.length}</Text>
                    </Box>
                  </InlineStack>

                  {results.trends.length > 1 && (
                    <Box>
                      <InlineStack gap="200" align="start">
                        <Text variant="bodyMd" color="subdued">7-Day Trend</Text>
                        {(() => {
                          const trend = formatTrend(results.trends)
                          return trend ? (
                            <InlineStack gap="100">
                              <Icon source={trend.icon} />
                              <Text variant="bodyMd" color={trend.color}>
                                {trend.value > 0 ? '+' : ''}{trend.value.toFixed(1)}%
                              </Text>
                            </InlineStack>
                          ) : null
                        })()}
                      </InlineStack>
                    </Box>
                  )}
                </BlockStack>
              </Card>

              {/* Gaps Table */}
              {results.gaps.length > 0 && (
                <Card>
                  <BlockStack gap="300">
                    <InlineStack align="space-between">
                      <Text variant="headingMd">Issues Found</Text>
                      {results.gaps.some(gap => gap.fixable) && (
                        <Button
                          variant="primary"
                          onClick={handleAutoFix}
                          loading={autoFixing}
                          disabled={autoFixing}
                        >
                          Auto-Fix Fixable Issues
                        </Button>
                      )}
                    </InlineStack>
                    
                    <DataTable
                      columnContentTypes={['text', 'text', 'numeric', 'text']}
                      headings={['Field', 'Severity', 'Count', 'Fixable']}
                      rows={gapsTableRows}
                    />
                  </BlockStack>
                </Card>
              )}

              {/* Trends Table */}
              {results.trends.length > 0 && (
                <Card>
                  <BlockStack gap="300">
                    <Text variant="headingMd">Health Score Trends (Last 7 Days)</Text>
                    <DataTable
                      columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                      headings={['Date', 'Score', 'Total Products', 'Valid Products']}
                      rows={trendsTableRows}
                    />
                  </BlockStack>
                </Card>
              )}

              {/* No Issues Found */}
              {results.gaps.length === 0 && (
                <Card>
                  <InlineStack align="center" gap="300">
                    <Icon source={CheckCircleIcon} />
                    <BlockStack gap="200">
                      <Text variant="headingMd">Excellent!</Text>
                      <Text variant="bodyMd" color="subdued">
                        Your catalog is in great health. No issues were found.
                      </Text>
                    </BlockStack>
                  </InlineStack>
                </Card>
              )}
            </BlockStack>
          ) : (
            <Text variant="bodyMd" color="subdued">
              No results available. Please try running the health check again.
            </Text>
          )}
        </Modal.Section>
      </Modal>

      {toast && (
        <Toast
          content={toast.content}
          error={toast.error}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  )
}
