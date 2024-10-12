
# infrastructure/variables.tf
variable "subscription_id" {
    description = "Azure Subscription ID"
    type = string

}
variable "tenant_id" {
    description = "Azure Tenant ID"
    type = string

}

variable "client_id" {
    description = "Azure Client ID"
    type = string

}


variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "capstonerg"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "West US"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
  default     = "capstoneacrsamb" # Must be globally unique
}

variable "aks_name" {
  description = "Name of the Azure Kubernetes Service Cluster"
  type        = string
  default     = "capstoneaksclusameerb"
}

variable "law_name" {
  description = "Name of the Log Analytics Workspace"
  type        = string
  default     = "myAppLAW"
}

