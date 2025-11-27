module.exports =
{
  "nested": {
    "brain_net_data_v3": {
      "options": {
        "java_package": "com.starj.xbrainnet",
        "java_outer_classname": "as_brain_net_data_v3"
      },
      "nested": {
        "vector_type": {
          "fields": {
            "x": {
              "type": "float",
              "id": 1
            },
            "y": {
              "type": "float",
              "id": 2
            },
            "z": {
              "type": "float",
              "id": 3
            }
          }
        },
        "orientation_type": {
          "fields": {
            "x": {
              "type": "float",
              "id": 1
            },
            "y": {
              "type": "float",
              "id": 2
            },
            "z": {
              "type": "float",
              "id": 3
            },
            "w": {
              "type": "float",
              "id": 4
            }
          }
        },
        "vector_2d_type": {
          "fields": {
            "x": {
              "type": "float",
              "id": 1
            },
            "y": {
              "type": "float",
              "id": 2
            }
          }
        },
        "polyline_type": {
          "fields": {
            "pos": {
              "rule": "repeated",
              "type": "vector_type",
              "id": 1
            }
          }
        },
        "brain_gps_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "baseStatus": {
              "type": "int32",
              "id": 2
            },
            "longitude": {
              "type": "double",
              "id": 3
            },
            "latitude": {
              "type": "double",
              "id": 4
            },
            "altitude": {
              "type": "float",
              "id": 5
            },
            "hdop": {
              "type": "float",
              "id": 6
            },
            "gpsStatus": {
              "type": "uint32",
              "id": 7
            },
            "positionCovarianceType": {
              "type": "uint32",
              "id": 8
            },
            "positionCovariance": {
              "rule": "repeated",
              "type": "double",
              "id": 9
            }
          }
        },
        "brain_app_locator_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "baseStatus": {
              "type": "int32",
              "id": 2
            },
            "accuracy": {
              "type": "float",
              "id": 3
            },
            "localS": {
              "type": "float",
              "id": 4
            },
            "localSpd": {
              "type": "vector_type",
              "id": 5
            },
            "localPose": {
              "type": "vector_type",
              "id": 6
            },
            "localPoseAngle": {
              "type": "vector_type",
              "id": 7
            },
            "localOrientation": {
              "type": "orientation_type",
              "id": 8
            }
          }
        },
        "app_planner_type": {
          "fields": {
            "x": {
              "type": "float",
              "id": 1
            },
            "y": {
              "type": "float",
              "id": 2
            },
            "z": {
              "type": "float",
              "id": 3
            },
            "theta": {
              "type": "float",
              "id": 4
            },
            "kappa": {
              "type": "float",
              "id": 5
            },
            "dkappa": {
              "type": "float",
              "id": 6
            },
            "s": {
              "type": "float",
              "id": 7
            },
            "v": {
              "type": "float",
              "id": 8
            },
            "a": {
              "type": "float",
              "id": 9
            },
            "t": {
              "type": "float",
              "id": 10
            }
          }
        },
        "brain_app_planner_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "laneIds": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            },
            "traj": {
              "rule": "repeated",
              "type": "app_planner_type",
              "id": 3
            }
          }
        },
        "BatteryEnergy": {
          "values": {
            "BT_UNKNOWN": 0,
            "SUFFICIENT": 1,
            "THREEQUSRTES": 2,
            "HALF": 3,
            "AQUARTER": 4
          }
        },
        "FaultStatus": {
          "values": {
            "FT_UNKNOWN": 0,
            "GOOD": 1,
            "LIGHTFAILURE": 2,
            "DISPLAYFAILURE": 3,
            "CHASISFAILURE": 4,
            "POWERFAILURE": 5
          }
        },
        "TaskState": {
          "values": {
            "TS_UNKNOWN": 0,
            "BUSY": 1,
            "IDLE": 2
          }
        },
        "TastStatus": {
          "fields": {
            "taskId": {
              "type": "string",
              "id": 1
            },
            "taskState": {
              "type": "TaskState",
              "id": 2
            }
          }
        },
        "VehicleStatus": {
          "fields": {
            "batteryEnergy": {
              "type": "BatteryEnergy",
              "id": 1
            },
            "faultStatus": {
              "type": "FaultStatus",
              "id": 2
            },
            "taskStatus": {
              "type": "TastStatus",
              "id": 3
            }
          }
        },
        "Lid_info": {
          "values": {
            "UNKNOWN": 0,
            "open": 1,
            "close": 2
          }
        },
        "task_status_info": {
          "fields": {
            "taskId": {
              "type": "uint32",
              "id": 1
            },
            "VehicleStatus": {
              "type": "uint32",
              "id": 2
            },
            "lid_Status": {
              "type": "Lid_info",
              "id": 3
            },
            "lightStatus": {
              "type": "uint32",
              "id": 4
            },
            "taskStatus": {
              "type": "uint32",
              "id": 5
            },
            "pathTraj": {
              "type": "path_type",
              "id": 6
            },
            "curLaneId": {
              "type": "lane_type",
              "id": 7
            },
            "curTargetPoint": {
              "type": "int32",
              "id": 8
            },
            "taskTotalLinesCt": {
              "type": "int32",
              "id": 9
            },
            "taskCurLineIndex": {
              "type": "int32",
              "id": 10
            },
            "isTrapped": {
              "type": "bool",
              "id": 11
            },
            "taskMode": {
              "type": "int32",
              "id": 12
            },
            "controlMode": {
              "type": "int32",
              "id": 13
            },
            "createMapInfo": {
              "type": "create_map_info",
              "id": 14
            },
            "curRoadId": {
              "type": "road_type",
              "id": 15
            },
            "temp": {
              "type": "bool",
              "id": 16
            },
            "vehConntrolStopStatus": {
              "type": "veh_conntrol_stop_status_type",
              "id": 17
            },
            "smSignal": {
              "type": "state_management_signal_type",
              "id": 18
            },
            "vehStateInTask": {
              "type": "veh_state_in_task_type",
              "id": 19
            },
            "dispatchInfo": {
              "type": "starj_dispatch.dispatch_info_type",
              "id": 20
            }
          }
        },
        "veh_state_in_task_type": {
          "fields": {
            "horn": {
              "type": "bool",
              "id": 1
            },
            "clean": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "veh_conntrol_stop_status_type": {
          "fields": {
            "vehConntrolIsStop": {
              "type": "bool",
              "id": 1
            },
            "vehConntrolStopReason": {
              "type": "string",
              "id": 2
            },
            "isStopByHotkeyStatus": {
              "type": "bool",
              "id": 3
            },
            "schedulingStatus": {
              "type": "scheduling_status_type",
              "id": 4
            }
          }
        },
        "scheduling_status_type": {
          "fields": {
            "isStopBySchedulingStatus": {
              "type": "bool",
              "id": 1
            },
            "stopBySchedulingReason": {
              "type": "string",
              "id": 2
            }
          }
        },
        "veh_status_type": {
          "fields": {
            "gpsStatus": {
              "type": "uint32",
              "id": 1
            },
            "batteryState": {
              "type": "battery_state_type",
              "id": 2
            },
            "positionCovarianceType": {
              "type": "uint32",
              "id": 3
            },
            "odom": {
              "type": "float",
              "id": 4
            }
          }
        },
        "battery_state_type": {
          "fields": {
            "voltage": {
              "type": "float",
              "id": 1
            },
            "current": {
              "type": "float",
              "id": 2
            },
            "soc": {
              "type": "uint32",
              "id": 3
            },
            "soh": {
              "type": "uint32",
              "id": 4
            },
            "temperature": {
              "type": "float",
              "id": 5
            },
            "charge": {
              "type": "bool",
              "id": 6
            }
          }
        },
        "comfirm_task_info": {
          "fields": {
            "valid": {
              "type": "bool",
              "id": 1
            },
            "finishComfirm": {
              "type": "bool",
              "id": 2
            },
            "cancelTask": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "target_info": {
          "fields": {
            "valid": {
              "type": "bool",
              "id": 1
            },
            "pos": {
              "type": "vector_type",
              "id": 2
            },
            "taskId": {
              "type": "uint32",
              "id": 3
            }
          }
        },
        "lid_task_info": {
          "fields": {
            "valid": {
              "type": "bool",
              "id": 1
            },
            "lidTask": {
              "type": "int32",
              "id": 2
            },
            "taskId": {
              "type": "uint32",
              "id": 3
            }
          }
        },
        "light_task_info": {
          "fields": {
            "valid": {
              "type": "bool",
              "id": 1
            },
            "lightTask": {
              "type": "int32",
              "id": 2
            },
            "taskId": {
              "type": "uint32",
              "id": 3
            }
          }
        },
        "online_clients": {
          "fields": {
            "clientsVim": {
              "rule": "repeated",
              "type": "string",
              "id": 1
            }
          }
        },
        "path_line_msg": {
          "fields": {
            "pos": {
              "rule": "repeated",
              "type": "path_line_msg",
              "id": 1
            }
          }
        },
        "path_points_msg": {
          "fields": {
            "pathLine": {
              "rule": "repeated",
              "type": "path_line_msg",
              "id": 1
            }
          }
        },
        "gps_type": {
          "fields": {
            "lat": {
              "type": "double",
              "id": 1
            },
            "lon": {
              "type": "double",
              "id": 2
            },
            "alt": {
              "type": "double",
              "id": 3
            }
          }
        },
        "chasis_data_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "chasisCanData": {
              "type": "chasis_data_info",
              "id": 2
            },
            "chassisDiagnosis": {
              "type": "chassis_diagnosis_type",
              "id": 3
            }
          }
        },
        "chasis_data_info": {
          "fields": {
            "xSpd": {
              "type": "float",
              "id": 1
            },
            "ySpd": {
              "type": "float",
              "id": 2
            },
            "radWheel": {
              "type": "float",
              "id": 3
            },
            "leftRpm": {
              "type": "int64",
              "id": 4
            },
            "leftWheelSpeed": {
              "type": "float",
              "id": 5
            },
            "leftWheelPulse": {
              "type": "int64",
              "id": 6
            },
            "rightRpm": {
              "type": "int64",
              "id": 7
            },
            "rightWheelSpeed": {
              "type": "float",
              "id": 8
            },
            "rightWheelPulse": {
              "type": "int64",
              "id": 9
            }
          }
        },
        "chassis_diagnosis_type": {
          "fields": {
            "bmsSoc": {
              "type": "uint32",
              "id": 1
            },
            "bmsSoh": {
              "type": "uint32",
              "id": 2
            },
            "batteryVoltage": {
              "type": "float",
              "id": 3
            },
            "batteryCurrent": {
              "type": "float",
              "id": 4
            },
            "batteryTemperature": {
              "type": "float",
              "id": 5
            },
            "rlWheelVoltage": {
              "type": "float",
              "id": 6
            },
            "rlWheelCurrent": {
              "type": "float",
              "id": 7
            },
            "rlWheelDriveTemperature": {
              "type": "int32",
              "id": 8
            },
            "rlWheelElectricalMachineryTemperature": {
              "type": "int32",
              "id": 9
            },
            "rlWheelDriveSpecialSpace": {
              "type": "int32",
              "id": 10
            },
            "rrWheelVoltage": {
              "type": "float",
              "id": 11
            },
            "rrWheelCurrent": {
              "type": "float",
              "id": 12
            },
            "rrWheelDriveTemperature": {
              "type": "int32",
              "id": 13
            },
            "rrWheelElectricalMachineryTemperature": {
              "type": "int32",
              "id": 14
            },
            "rrWheelDriveSpecialSpace": {
              "type": "int32",
              "id": 15
            },
            "fWheelCurrent": {
              "type": "float",
              "id": 16
            },
            "fWheelDriveSpecialSpace": {
              "type": "int32",
              "id": 17
            },
            "bmsWorkingModeStatus": {
              "type": "int32",
              "id": 18
            },
            "bmsWarningStatus": {
              "type": "int32",
              "id": 19
            },
            "bmsProtectionStatus": {
              "type": "int32",
              "id": 20
            },
            "bmsChargingStatus": {
              "type": "int32",
              "id": 21
            },
            "lidStatus": {
              "type": "int32",
              "id": 22
            },
            "controlMode": {
              "type": "uint32",
              "id": 23
            },
            "emergencyStopStatus": {
              "type": "uint32",
              "id": 24
            },
            "touchSensorStopStatus": {
              "type": "uint32",
              "id": 25
            },
            "errorElectricalMachinery": {
              "type": "uint32",
              "id": 26
            },
            "errorDrive": {
              "type": "uint32",
              "id": 27
            },
            "errorCommunicate": {
              "type": "uint32",
              "id": 28
            },
            "errorOther": {
              "type": "uint32",
              "id": 29
            },
            "errorBattery": {
              "type": "uint32",
              "id": 30
            },
            "rcToggleSwitch": {
              "type": "uint32",
              "id": 31
            },
            "leftJoyHorizAxis": {
              "type": "int32",
              "id": 32
            },
            "leftJoyVertAxis": {
              "type": "int32",
              "id": 33
            },
            "joyLeftVra": {
              "type": "int32",
              "id": 34
            },
            "rightJoyHorizAxis": {
              "type": "int32",
              "id": 35
            },
            "rightJoyVertAxis": {
              "type": "int32",
              "id": 36
            },
            "joyRightVra": {
              "type": "int32",
              "id": 37
            },
            "gearStatus": {
              "type": "uint32",
              "id": 38
            },
            "blackBoxStatus": {
              "type": "uint32",
              "id": 39
            },
            "frontLightStatus": {
              "type": "uint32",
              "id": 40
            },
            "chassisOtherInfo": {
              "type": "ChassisOtherInfo",
              "id": 41
            },
            "powerOffStatus": {
              "type": "PowerOffStatus",
              "id": 42
            }
          }
        },
        "PowerOffStatus": {
          "fields": {
            "powerOffStatus": {
              "type": "int32",
              "id": 1
            },
            "powerOffCountdown": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "ChassisOtherInfo": {
          "fields": {
            "waterSpray": {
              "type": "int32",
              "id": 1
            },
            "sweeping": {
              "type": "int32",
              "id": 2
            },
            "lidStatus": {
              "type": "int32",
              "id": 3
            },
            "blackBoxStatus": {
              "type": "uint32",
              "id": 4
            },
            "horn": {
              "type": "uint32",
              "id": 5
            },
            "rainSensor": {
              "type": "int32",
              "id": 6
            },
            "waterLevelSensor": {
              "type": "int32",
              "id": 7
            },
            "rainSensorOffline": {
              "type": "int32",
              "id": 8
            },
            "waterLevelSensorOffline": {
              "type": "int32",
              "id": 9
            },
            "garbageSensorOffline": {
              "type": "int32",
              "id": 10
            },
            "garbageDetectDistanceVal": {
              "type": "int32",
              "id": 11
            },
            "autoWaterSpraySwitch": {
              "type": "int32",
              "id": 12
            }
          }
        },
        "img_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "cameraId": {
              "type": "string",
              "id": 2
            },
            "width": {
              "type": "uint32",
              "id": 3
            },
            "height": {
              "type": "uint32",
              "id": 4
            },
            "data": {
              "type": "bytes",
              "id": 5
            },
            "format": {
              "type": "string",
              "id": 6
            },
            "description": {
              "type": "string",
              "id": 7
            }
          }
        },
        "car_info_type": {
          "fields": {
            "carVin": {
              "type": "string",
              "id": 1
            },
            "brainAppLocator": {
              "type": "brain_app_locator_type",
              "id": 2
            },
            "brainGps": {
              "type": "brain_gps_type",
              "id": 3
            },
            "odom": {
              "type": "float",
              "id": 4
            },
            "pboxInfo": {
              "type": "brain_gps_type",
              "id": 5
            },
            "imgList": {
              "rule": "repeated",
              "type": "img_type",
              "id": 6
            },
            "carType": {
              "type": "string",
              "id": 7
            }
          }
        },
        "brain_node_data": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "carInfo": {
              "type": "car_info_type",
              "id": 2
            },
            "taskStatus": {
              "type": "task_status_info",
              "id": 3
            },
            "chasisData": {
              "type": "chasis_data_type",
              "id": 4
            },
            "systemStatus": {
              "type": "system_status_type",
              "id": 5
            },
            "envInfo": {
              "type": "env_info_type",
              "id": 6
            },
            "remoteControl": {
              "type": "remote_control_type",
              "id": 7
            },
            "rt3588Status": {
              "type": "rt3588_status_type",
              "id": 8
            },
            "vehConfirmRecvPath": {
              "type": "veh_confirm_recv_path_type",
              "id": 9
            },
            "nvmDeviceState": {
              "type": "nvm_device_state_type",
              "id": 10
            },
            "powerOnOffInfo": {
              "type": "power_on_off_type",
              "id": 11
            }
          }
        },
        "nvm_device_state_type": {
          "fields": {
            "autoWaterSpraySwitch": {
              "type": "int32",
              "id": 1
            },
            "frontLight": {
              "type": "int32",
              "id": 2
            },
            "hornAutoSwitch": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "state_management_signal_type": {
          "fields": {
            "rdmodulecomTrackingMode": {
              "type": "int32",
              "id": 1
            },
            "rdmodulecomSensorfusion": {
              "type": "int32",
              "id": 2
            },
            "rdmodulecomLocalization": {
              "type": "int32",
              "id": 3
            },
            "rdmodulecomMotionplanning": {
              "type": "int32",
              "id": 4
            },
            "rdmodulecom_1State": {
              "type": "int32",
              "id": 5
            },
            "rdmodulecom_2State": {
              "type": "int32",
              "id": 6
            },
            "rdmodulecom_3State": {
              "type": "int32",
              "id": 7
            },
            "rdmodulecom_4State": {
              "type": "int32",
              "id": 8
            },
            "rdmodulecom_5State": {
              "type": "int32",
              "id": 9
            },
            "rdmodulecom_6State": {
              "type": "int32",
              "id": 10
            },
            "rdmodulecom_7State": {
              "type": "int32",
              "id": 11
            },
            "rdmodulecom_8State": {
              "type": "int32",
              "id": 12
            },
            "rdmodulecom_9State": {
              "type": "int32",
              "id": 13
            },
            "rdmodulecom_10State": {
              "type": "int32",
              "id": 14
            },
            "rdmodulecom_11State": {
              "type": "int32",
              "id": 15
            },
            "rdmodulecom_12State": {
              "type": "int32",
              "id": 16
            },
            "rdmodulecom_13State": {
              "type": "int32",
              "id": 17
            },
            "rdmodulecom_14State": {
              "type": "int32",
              "id": 18
            },
            "rdmodulecom_15State": {
              "type": "int32",
              "id": 19
            },
            "rdmodulecom_16State": {
              "type": "int32",
              "id": 20
            },
            "rdmodulecom_17State": {
              "type": "int32",
              "id": 21
            },
            "rdmodulecom_18State": {
              "type": "int32",
              "id": 22
            },
            "rdmodulecom_19State": {
              "type": "int32",
              "id": 23
            },
            "rdmodulecom_20State": {
              "type": "int32",
              "id": 24
            },
            "rdmodulecom_21State": {
              "type": "int32",
              "id": 25
            },
            "rdmodulecom_22State": {
              "type": "int32",
              "id": 26
            },
            "rdmodulecom_23State": {
              "type": "int32",
              "id": 27
            },
            "rdmodulecom_24State": {
              "type": "int32",
              "id": 28
            },
            "rdmodulecom_25State": {
              "type": "int32",
              "id": 29
            },
            "rdmodulecom_26State": {
              "type": "float",
              "id": 30
            },
            "rdmodulecom_27State": {
              "type": "float",
              "id": 31
            },
            "rdmodulecom_28State": {
              "type": "float",
              "id": 32
            },
            "rdmodulecom_29State": {
              "type": "float",
              "id": 33
            },
            "rdmodulecom_30State": {
              "type": "float",
              "id": 34
            }
          }
        },
        "rt3588_status_type": {
          "fields": {
            "cpuTemperature": {
              "type": "float",
              "id": 1
            },
            "cpuUsage": {
              "type": "float",
              "id": 2
            }
          }
        },
        "software_version_type": {
          "fields": {
            "version": {
              "type": "string",
              "id": 1
            },
            "submoduleVersion": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "server_type": {
          "fields": {
            "envType": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "map_type": {
          "fields": {
            "name": {
              "type": "string",
              "id": 1
            },
            "id": {
              "type": "string",
              "id": 2
            },
            "mapVersion": {
              "type": "string",
              "id": 3
            },
            "shaVersion": {
              "type": "string",
              "id": 4
            },
            "mapFilePath": {
              "type": "string",
              "id": 5
            }
          }
        },
        "env_info_type": {
          "fields": {
            "softwareVersion": {
              "type": "software_version_type",
              "id": 1
            },
            "mapInfo": {
              "type": "map_type",
              "id": 2
            },
            "serverInfo": {
              "type": "server_type",
              "id": 3
            }
          }
        },
        "system_status_type": {
          "fields": {
            "totalCpuUsage": {
              "type": "cpu_usage_type",
              "id": 1
            },
            "allCpuUsage": {
              "rule": "repeated",
              "type": "cpu_usage_type",
              "id": 2
            },
            "memInfo": {
              "type": "mem_info_type",
              "id": 3
            },
            "voltage": {
              "type": "float",
              "id": 4
            },
            "temperature": {
              "type": "float",
              "id": 5
            },
            "processInfo": {
              "rule": "repeated",
              "type": "process_info_type",
              "id": 6
            },
            "nodeInfo": {
              "rule": "repeated",
              "type": "node_info_type",
              "id": 7
            },
            "existNodes": {
              "rule": "repeated",
              "type": "string",
              "id": 8
            },
            "nonExistNodes": {
              "rule": "repeated",
              "type": "string",
              "id": 9
            },
            "firmwareDiagnosis": {
              "type": "firmware_diagnosis_type",
              "id": 10
            },
            "mqttStatus": {
              "type": "mqtt_status_type",
              "id": 11
            },
            "sauStatus": {
              "type": "int32",
              "id": 100
            },
            "initingStatus": {
              "type": "int32",
              "id": 101
            }
          }
        },
        "mqtt_status_type": {
          "fields": {
            "state": {
              "type": "int32",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            }
          }
        },
        "firmware_diagnosis_type": {
          "fields": {
            "firmwareDiagnosisInfo": {
              "rule": "repeated",
              "type": "firmware_diagnosis",
              "id": 1
            }
          }
        },
        "firmware_diagnosis": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "firmwareName": {
              "type": "string",
              "id": 2
            },
            "state": {
              "rule": "repeated",
              "type": "string",
              "id": 3
            },
            "msg": {
              "rule": "repeated",
              "type": "string",
              "id": 4
            },
            "level": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "cpu_usage_type": {
          "fields": {
            "index": {
              "type": "uint32",
              "id": 1
            },
            "rtUsage": {
              "type": "float",
              "id": 2
            },
            "avgUsage": {
              "type": "float",
              "id": 3
            }
          }
        },
        "process_info_type": {
          "fields": {
            "pid": {
              "type": "uint32",
              "id": 1
            },
            "procName": {
              "type": "string",
              "id": 2
            },
            "memoryUsagePct": {
              "type": "float",
              "id": 3
            },
            "cpuPercentPct": {
              "type": "float",
              "id": 4
            }
          }
        },
        "node_info_type": {
          "fields": {
            "nodeName": {
              "type": "string",
              "id": 1
            },
            "topic": {
              "type": "string",
              "id": 2
            },
            "hz": {
              "type": "float",
              "id": 3
            }
          }
        },
        "mem_info_type": {
          "fields": {
            "totalMemMb": {
              "type": "float",
              "id": 1
            },
            "usedMemMb": {
              "type": "float",
              "id": 2
            },
            "usedMemPct": {
              "type": "float",
              "id": 3
            }
          }
        },
        "lane_type": {
          "fields": {
            "laneId": {
              "type": "int32",
              "id": 1
            },
            "type": {
              "type": "uint32",
              "id": 2
            },
            "trajs": {
              "rule": "repeated",
              "type": "gps_type",
              "id": 4
            },
            "prevLaneId": {
              "rule": "repeated",
              "type": "int32",
              "id": 5
            },
            "nextLaneId": {
              "rule": "repeated",
              "type": "int32",
              "id": 6
            },
            "minSpeed": {
              "type": "float",
              "id": 7
            },
            "maxSpeed": {
              "type": "float",
              "id": 8
            },
            "trafficType": {
              "type": "int32",
              "id": 9
            },
            "layerType": {
              "type": "int32",
              "id": 10
            },
            "laneWidth": {
              "type": "float",
              "id": 11
            },
            "roadInfo": {
              "type": "road_type",
              "id": 12
            },
            "enuPosList": {
              "rule": "repeated",
              "type": "vector_type",
              "id": 13
            }
          }
        },
        "road_type": {
          "fields": {
            "roadId": {
              "type": "uint64",
              "id": 1
            },
            "type": {
              "type": "uint32",
              "id": 2
            },
            "prevRoadId": {
              "rule": "repeated",
              "type": "int32",
              "id": 3
            },
            "nextRoadId": {
              "rule": "repeated",
              "type": "int32",
              "id": 4
            },
            "minSpeed": {
              "type": "float",
              "id": 5
            },
            "maxSpeed": {
              "type": "float",
              "id": 6
            },
            "trafficType": {
              "type": "int32",
              "id": 7
            },
            "layerType": {
              "type": "int32",
              "id": 8
            },
            "roadWidth": {
              "type": "float",
              "id": 9
            }
          }
        },
        "destination_type": {
          "fields": {
            "id": {
              "type": "uint32",
              "id": 1
            },
            "targetType": {
              "type": "int32",
              "id": 2
            },
            "category": {
              "type": "int32",
              "id": 3
            },
            "name": {
              "type": "string",
              "id": 4
            },
            "pos": {
              "type": "vector_type",
              "id": 5
            },
            "theta": {
              "type": "float",
              "id": 6
            },
            "gpsPos": {
              "type": "gps_type",
              "id": 7
            },
            "slotEnuPolyline": {
              "type": "polyline_type",
              "id": 8
            },
            "center": {
              "type": "vector_type",
              "id": 9
            },
            "roadId": {
              "type": "string",
              "id": 10
            },
            "wgsCenter": {
              "type": "gps_type",
              "id": 11
            }
          }
        },
        "path_type": {
          "fields": {
            "startPointIndex": {
              "type": "uint32",
              "id": 1
            },
            "targetPointIndex": {
              "type": "uint32",
              "id": 2
            },
            "pathName": {
              "type": "string",
              "id": 3
            },
            "trajs": {
              "rule": "repeated",
              "type": "gps_type",
              "id": 4
            },
            "laneIdList": {
              "rule": "repeated",
              "type": "lane_type",
              "id": 5
            },
            "targetPoint": {
              "type": "int32",
              "id": 6
            },
            "destinationInfo": {
              "type": "destination_type",
              "id": 7
            },
            "targetPointType": {
              "type": "int32",
              "id": 8
            },
            "cleanMode": {
              "type": "int32",
              "id": 9
            },
            "targetPointCleanMode": {
              "type": "int32",
              "id": 10
            }
          }
        },
        "web_task_info": {
          "fields": {
            "webOrderInfo": {
              "type": "web_order_task_info",
              "id": 1
            },
            "webTaskStatus": {
              "type": "web_task_status_type",
              "id": 2
            }
          }
        },
        "web_order_task_info": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "tastStage": {
              "type": "uint32",
              "id": 2
            },
            "orderStatus": {
              "type": "uint32",
              "id": 3
            },
            "stormData": {
              "type": "brain_storm_data",
              "id": 4
            },
            "aPos": {
              "type": "vector_type",
              "id": 5
            },
            "bPos": {
              "type": "vector_type",
              "id": 6
            },
            "pathLines": {
              "rule": "repeated",
              "type": "path_type",
              "id": 7
            },
            "mapInfo": {
              "type": "map_type",
              "id": 8
            },
            "vaildFlag": {
              "type": "bool",
              "id": 9
            },
            "carInfo": {
              "type": "car_info_dispatch",
              "id": 10
            },
            "cr3Info": {
              "type": "cr3_setting_config",
              "id": 11
            },
            "channel": {
              "type": "string",
              "id": 12
            }
          }
        },
        "brain_storm_data": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "baseStatus": {
              "type": "int32",
              "id": 2
            },
            "taskId": {
              "type": "string",
              "id": 3
            },
            "commandMode": {
              "type": "int32",
              "id": 4
            },
            "commandTraj": {
              "type": "bytes",
              "id": 6
            },
            "taskStartPos": {
              "type": "vector_type",
              "id": 7
            },
            "taskTargetPos": {
              "type": "vector_type",
              "id": 8
            },
            "errorMsg": {
              "type": "ErrorMessage",
              "id": 9
            },
            "orderTask": {
              "type": "order_task_info",
              "id": 10
            },
            "taskMode": {
              "type": "int32",
              "id": 11
            },
            "controlMode": {
              "type": "int32",
              "id": 12
            },
            "isSchedulingMode": {
              "type": "bool",
              "id": 13
            }
          }
        },
        "ErrorMessage": {
          "fields": {
            "msgId": {
              "type": "uint32",
              "id": 1
            },
            "webTime": {
              "type": "uint64",
              "id": 2
            },
            "endTime": {
              "type": "uint64",
              "id": 3
            },
            "version": {
              "type": "string",
              "id": 4
            },
            "errorType": {
              "type": "string",
              "id": 5
            },
            "subType": {
              "type": "string",
              "id": 6
            },
            "msg": {
              "type": "string",
              "id": 7
            }
          }
        },
        "order_task_info": {
          "fields": {
            "targetPos": {
              "type": "target_info",
              "id": 1
            },
            "lidTask": {
              "type": "lid_task_info",
              "id": 2
            },
            "taskComfirm": {
              "type": "comfirm_task_info",
              "id": 3
            },
            "taskId": {
              "type": "uint32",
              "id": 4
            },
            "lightTask": {
              "type": "light_task_info",
              "id": 5
            }
          }
        },
        "container_info": {
          "fields": {
            "lidStatus": {
              "type": "int32",
              "id": 1
            },
            "resetPosition": {
              "type": "bool",
              "id": 2
            },
            "resetPositionId": {
              "type": "string",
              "id": 3
            },
            "frontLightSwitch": {
              "type": "front_light_switch_type",
              "id": 4
            },
            "instruction": {
              "type": "instruction_type",
              "id": 5
            },
            "serverSwith": {
              "type": "server_switch_type",
              "id": 6
            },
            "taskMode": {
              "type": "task_mode_type",
              "id": 7
            },
            "setPoi": {
              "type": "set_poi_type",
              "id": 8
            },
            "remoteControlInfo": {
              "type": "remote_control_type",
              "id": 9
            },
            "functionBtnInfo": {
              "type": "function_btn_type",
              "id": 10
            },
            "clearChassisWarnInfo": {
              "type": "clear_chassis_warn_type",
              "id": 11
            },
            "rt3588StatusInfo": {
              "type": "rt3588_status_type",
              "id": 12
            },
            "hornControlInfo": {
              "type": "horn_control_type",
              "id": 13
            },
            "autoWaterSpraySwitchInfo": {
              "type": "auto_water_spray_switch_type",
              "id": 14
            },
            "autoHornSwitchInfo": {
              "type": "auto_horn_switch_type",
              "id": 15
            },
            "powerOnOffInfo": {
              "type": "power_on_off_type",
              "id": 16
            },
            "basetime": {
              "type": "uint64",
              "id": 17
            }
          }
        },
        "horn_control_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "horn": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "clear_chassis_warn_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "clearVal": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "function_btn_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "btn1Click": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "remote_control_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "controlSwitch": {
              "type": "bool",
              "id": 2
            },
            "controlMode": {
              "type": "int32",
              "id": 3
            },
            "mobileDeviceId": {
              "type": "string",
              "id": 4
            }
          }
        },
        "task_mode_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "mode": {
              "type": "int32",
              "id": 2
            },
            "taskSwitch": {
              "type": "int32",
              "id": 3
            },
            "mapName": {
              "type": "string",
              "id": 4
            },
            "controlMode": {
              "type": "int32",
              "id": 5
            },
            "createMapType": {
              "type": "int32",
              "id": 6
            }
          }
        },
        "create_map_info": {
          "fields": {
            "infoMsg": {
              "type": "string",
              "id": 1
            },
            "status": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "set_poi_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "index": {
              "type": "int32",
              "id": 3
            },
            "type": {
              "type": "int32",
              "id": 4
            },
            "poiName": {
              "type": "string",
              "id": 5
            }
          }
        },
        "server_switch_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "envType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "instruction_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "val": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "front_light_switch_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "lightSwitch": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "web_task_status_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "status": {
              "type": "string",
              "id": 2
            }
          }
        },
        "auto_water_spray_switch_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "waterSwitch": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "auto_horn_switch_type": {
          "fields": {
            "validFlag": {
              "type": "bool",
              "id": 1
            },
            "autoHornSwitchVal": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "veh_confirm_recv_path_type": {
          "fields": {
            "vaildFlag": {
              "type": "bool",
              "id": 1
            },
            "status": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "car_info_dispatch": {
          "fields": {
            "model": {
              "type": "uint32",
              "id": 1
            },
            "speed": {
              "type": "float",
              "id": 2
            },
            "minSpeed": {
              "type": "float",
              "id": 3
            },
            "maxSpeed": {
              "type": "float",
              "id": 4
            }
          }
        },
        "cr3_setting_config": {
          "fields": {
            "lowBattery": {
              "type": "uint32",
              "id": 1
            },
            "lowWater": {
              "type": "uint32",
              "id": 2
            },
            "rain": {
              "type": "uint32",
              "id": 3
            },
            "wasteFull": {
              "type": "uint32",
              "id": 4
            },
            "sprayWater": {
              "type": "uint32",
              "id": 5
            }
          }
        },
        "dispatch_type": {
          "fields": {
            "validFlag": {
              "type": "bool",
              "id": 1
            },
            "dispatchInfo": {
              "type": "starj_dispatch.dispatch_info_type",
              "id": 2
            }
          }
        },
        "power_on_off_type": {
          "fields": {
            "sauOnValidFlag": {
              "type": "bool",
              "id": 1
            },
            "sauPowerOnTime": {
              "type": "uint64",
              "id": 2
            },
            "sauPowerOff": {
              "type": "bool",
              "id": 3
            },
            "powerOff": {
              "type": "bool",
              "id": 4
            }
          }
        }
      }
    },
    "starj_dispatch": {
      "options": {
        "java_package": "com.starj.xbrainnet",
        "java_outer_classname": "DispatchInfoProto"
      },
      "nested": {
        "vector_type": {
          "fields": {
            "x": {
              "type": "float",
              "id": 1
            },
            "y": {
              "type": "float",
              "id": 2
            },
            "z": {
              "type": "float",
              "id": 3
            }
          }
        },
        "command_type": {
          "values": {
            "DEFAULT": 0,
            "PAUSE": 1,
            "RESUME": 2,
            "SPEEDDOWN": 3,
            "PULLOVER_LEFT": 4,
            "PULLOVER_RIGHT": 5
          }
        },
        "car_info_type": {
          "fields": {
            "basetime": {
              "type": "uint64",
              "id": 1
            },
            "cloudTime": {
              "type": "uint64",
              "id": 2
            },
            "carVin": {
              "type": "string",
              "id": 3
            },
            "carStatus": {
              "type": "uint32",
              "id": 4
            },
            "localSpeed": {
              "type": "vector_type",
              "id": 5
            },
            "localPose": {
              "type": "vector_type",
              "id": 6
            },
            "localPoseAngle": {
              "type": "vector_type",
              "id": 7
            }
          }
        },
        "dispatch_info": {
          "fields": {
            "command": {
              "type": "command_type",
              "id": 1
            },
            "maxSpeed": {
              "type": "float",
              "id": 2
            },
            "parkingArea": {
              "rule": "repeated",
              "type": "vector_type",
              "id": 3
            }
          }
        },
        "dispatch_info_type": {
          "fields": {
            "selfCar": {
              "type": "car_info_type",
              "id": 1
            },
            "others": {
              "rule": "repeated",
              "type": "car_info_type",
              "id": 2
            },
            "dispatchStatus": {
              "type": "dispatch_info",
              "id": 3
            }
          }
        }
      }
    }
  }
}
