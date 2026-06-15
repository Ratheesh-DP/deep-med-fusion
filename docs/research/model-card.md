# Model Card: Attention U-Net Fusion

## Intended Use

Research support for multi-modal medical image fusion across MRI, CT, and PET scans.

## Architecture

- Attention-gated U-Net encoders per modality
- Feature concatenation at bottleneck level
- Lightweight decoder for fused image reconstruction
- Optimization using intensity, gradient, SSIM, and perceptual objectives

## Validation Targets

- Fusion quality: 92%
- Review-time reduction: 40%
- Throughput: 1000+ scans/day after queue and storage scaling

## Limitations

- Not clinically validated
- Dataset-specific bias must be evaluated
- PHI handling must be institutionally reviewed
- DICOM metadata must be scrubbed before research export
