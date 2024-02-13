
**Resource Specification**
```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    cni.projectcalico.org/containerID: '[REDACTED_AZURE_API_KEY][REDACTED_AZURE_API_KEY]'
    cni.projectcalico.org/podIP: '[REDACTED_IP]/32'
    cni.projectcalico.org/podIPs: '[REDACTED_IP]/32'
  creationTimestamp: '[REDACTED_TIMESTAMP_ISO8601]'
  generateName: mermaid-5d7d4fbd6d-
  labels:
    app: mermaid
    app-id: '[REDACTED_AZURE_API_KEY]d24b038a'
    family: servicegroup
    name: mermaid
    pod-template-hash: 5d7d4fbd6d
    released-by: gopaddle
    servicegroup: mermaid-sr2ai9v6
  managedFields:
    - apiVersion: v1
      fieldsType: FieldsV1
      fieldsV1:
        f:metadata:
          f:generateName: {}
          f:labels:
            .: {}
            f:app: {}
            f:app-id: {}
            f:family: {}
            f:name: {}
            f:pod-template-hash: {}
            f:released-by: {}
            f:servicegroup: {}
          f:ownerReferences:
            .: {}
            k:{"uid":"[REDACTED_UUID]"}: {}
        f:spec:
          f:containers:
            k:{"name":"mermaid"}:
              .: {}
              f:image: {}
              f:imagePullPolicy: {}
              f:name: {}
              f:ports:
                .: {}
                k:{"containerPort":8098,"protocol":"TCP"}:
                  .: {}
                  f:containerPort: {}
                  f:name: {}
                  f:protocol: {}
              f:resources: {}
              f:securityContext:
                .: {}
                f:capabilities:
                  .: {}
                  f:add: {}
              f:terminationMessagePath: {}
              f:terminationMessagePolicy: {}
          f:dnsPolicy: {}
          f:enableServiceLinks: {}
          f:restartPolicy: {}
          f:schedulerName: {}
          f:securityContext: {}
          f:terminationGracePeriodSeconds: {}
      manager: kubelite
      operation: Update
      time: '[REDACTED_TIMESTAMP_ISO8601]'
    - apiVersion: v1
      fieldsType: FieldsV1
      fieldsV1:
        f:metadata:
          f:annotations:
            .: {}
            f:cni.projectcalico.org/containerID: {}
            f:cni.projectcalico.org/podIP: {}
            f:cni.projectcalico.org/podIPs: {}
      manager: calico
      operation: Update
      subresource: status
      time: '[REDACTED_TIMESTAMP_ISO8601]'
    - apiVersion: v1
      fieldsType: FieldsV1
      fieldsV1:
        f:status:
          f:conditions:
            k:{"type":"ContainersReady"}:
              .: {}
              f:lastProbeTime: {}
              f:lastTransitionTime: {}
              f:status: {}
              f:type: {}
            k:{"type":"Initialized"}:
              .: {}
              f:lastProbeTime: {}
              f:lastTransitionTime: {}
              f:status: {}
              f:type: {}
            k:{"type":"Ready"}:
              .: {}
              f:lastProbeTime: {}
              f:lastTransitionTime: {}
              f:status: {}
              f:type: {}
          f:containerStatuses: {}
          f:hostIP: {}
          f:phase: {}
          f:podIP: {}
          f:podIPs:
            .: {}
            k:{"ip":"[REDACTED_IP]"}:
              .: {}
              f:ip: {}
          f:startTime: {}
      manager: kubelite
      operation: Update
      subresource: status
      time: '[REDACTED_TIMESTAMP_ISO8601]'
  name: mermaid-5d7d4fbd6d-8ppnv
  namespace: gopaddle
  ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: ReplicaSet
      name: mermaid-5d7d4fbd6d
      uid: '[REDACTED_UUID]'
  resourceVersion: '2938'
  uid: '[REDACTED_UUID]'
spec:
  containers:
    - image: trov/mermaid-cli:1
      imagePullPolicy: IfNotPresent
      name: mermaid
      ports:
        - containerPort: 8098
          name: http
          protocol: TCP
      resources: {}
      securityContext:
        capabilities:
          add:
            - SYS_ADMIN
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-vkq45
          readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: ip-10-0-2-193
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
    - effect: NoExecute
      key: node.kubernetes.io/unreachable
      operator: Exists
      tolerationSeconds: 300
  volumes:
    - name: kube-api-access-vkq45
      projected:
        defaultMode: 420
        sources:
          - serviceAccountToken:
              expirationSeconds: 3607
              path: token
          - configMap:
              items:
                - key: ca.crt
                  path: ca.crt
              name: kube-root-ca.crt
          - downwardAPI:
              items:
                - fieldRef:
                    apiVersion: v1
                    fieldPath: metadata.namespace
                  path: namespace
status:
  conditions:
    - lastProbeTime: null
      lastTransitionTime: '[REDACTED_TIMESTAMP_ISO8601]'
      status: 'True'
      type: Initialized
    - lastProbeTime: null
      lastTransitionTime: '[REDACTED_TIMESTAMP_ISO8601]'
      status: 'True'
      type: Ready
    - lastProbeTime: null
      lastTransitionTime: '[REDACTED_TIMESTAMP_ISO8601]'
      status: 'True'
      type: ContainersReady
    - lastProbeTime: null
      lastTransitionTime: '[REDACTED_TIMESTAMP_ISO8601]'
      status: 'True'
      type: PodScheduled
  containerStatuses:
    - containerID: containerd://[REDACTED_AZURE_API_KEY][REDACTED_AZURE_API_KEY]
      image: docker.io/trov/mermaid-cli:1
      imageID: >-
        docker.io/trov/mermaid-cli@sha256:[REDACTED_AZURE_API_KEY][REDACTED_AZURE_API_KEY]
      lastState: {}
      name: mermaid
      ready: true
      restartCount: 0
      started: true
      state:
        running:
          startedAt: '[REDACTED_TIMESTAMP_ISO8601]'
  hostIP: '[REDACTED_IP]'
  phase: Running
  podIP: '[REDACTED_IP]'
  podIPs:
    - ip: '[REDACTED_IP]'
  qosClass: BestEffort
  startTime: '[REDACTED_TIMESTAMP_ISO8601]'
```
