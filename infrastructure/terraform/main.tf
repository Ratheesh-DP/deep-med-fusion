terraform {
  required_version = ">= 1.8.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "medical_data" {
  bucket = var.medical_data_bucket
}

resource "aws_s3_bucket_server_side_encryption_configuration" "medical_data" {
  bucket = aws_s3_bucket.medical_data.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
